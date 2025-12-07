const { Sequelize } = require('sequelize');

let sequelize = null;

const initSequelize = () => {
  if (sequelize) return sequelize;
  
  // Helper function to check if a connection string is valid
  const isValidConnectionString = (uri) => {
    if (!uri || typeof uri !== 'string') return false;
    const trimmed = uri.trim();
    if (trimmed.length === 0) return false;
    if (!trimmed.startsWith('postgres://') && 
        !trimmed.startsWith('postgresql://') &&
        !trimmed.includes('postgres')) {
      return false;
    }
    return true;
  };
  
  let connectionString = null;
  let config = null;
  
  if (process.env.DATABASE_URL && isValidConnectionString(process.env.DATABASE_URL)) {
    connectionString = process.env.DATABASE_URL.trim();
    console.log('Using DATABASE_URL');
  } else if (process.env.POSTGRES_URL && isValidConnectionString(process.env.POSTGRES_URL)) {
    connectionString = process.env.POSTGRES_URL.trim();
    console.log('Using POSTGRES_URL');
  } else if (process.env.POSTGRES_HOST) {
    config = {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT || 5432,
      database: process.env.POSTGRES_DATABASE || 'recipehub',
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '',
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false
    };
    console.log('Using PostgreSQL connection from environment variables');
  } else {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL or POSTGRES_URL environment variable is required in production');
    }
    connectionString = 'postgres://postgres:postgres@localhost:5432/recipehub';
    console.log('Using localhost PostgreSQL (development mode)');
  }
  
  if (config) {
    sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      port: config.port,
      dialect: 'postgres',
      logging: config.logging
    });
  } else {
    sequelize = new Sequelize(connectionString, {
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
          require: true,
          rejectUnauthorized: false
        } : false
      }
    });
  }
  
  return sequelize;
};

const connectDB = async () => {
  try {
    if (!sequelize) {
      sequelize = initSequelize();
    }
    
    console.log('Connecting to PostgreSQL...');
    await sequelize.authenticate();
    console.log('PostgreSQL Connected');
    return sequelize;
  } catch (error) {
    console.error('PostgreSQL connection error:', error.message);
    console.error('Full error:', error);
    throw error;
  }
};

const getSequelize = () => {
  if (!sequelize) {
    sequelize = initSequelize();
  }
  return sequelize;
};

module.exports = { connectDB, getSequelize };
