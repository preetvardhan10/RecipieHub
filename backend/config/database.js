const { Sequelize } = require('sequelize');

let sequelize = null;

const initSequelize = () => {
  if (sequelize) return sequelize;
  
  // Helper function to check if a connection string is valid
  const isValidConnectionString = (uri) => {
    if (!uri || typeof uri !== 'string') {
      console.log('Invalid URI type:', typeof uri);
      return false;
    }
    const trimmed = uri.trim();
    if (trimmed.length === 0) {
      console.log('URI is empty after trim');
      return false;
    }
    // More lenient check - just needs to contain postgres
    if (!trimmed.includes('postgres')) {
      console.log('URI does not contain postgres:', trimmed.substring(0, 50));
      return false;
    }
    return true;
  };
  
  // Debug: Log what we have
  console.log('Checking environment variables...');
  console.log('DATABASE_PUBLIC_URL exists:', !!process.env.DATABASE_PUBLIC_URL);
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('POSTGRES_URL exists:', !!process.env.POSTGRES_URL);
  console.log('POSTGRES_HOST exists:', !!process.env.POSTGRES_HOST);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  
  let connectionString = null;
  let config = null;
  
  // Prefer DATABASE_PUBLIC_URL (works from any service, not just linked ones)
  if (process.env.DATABASE_PUBLIC_URL) {
    if (isValidConnectionString(process.env.DATABASE_PUBLIC_URL)) {
      connectionString = process.env.DATABASE_PUBLIC_URL.trim();
      console.log('Using DATABASE_PUBLIC_URL');
    } else {
      console.log('DATABASE_PUBLIC_URL exists but failed validation');
    }
  }
  
  // Fall back to DATABASE_URL (internal, requires service linking)
  if (!connectionString && process.env.DATABASE_URL) {
    if (isValidConnectionString(process.env.DATABASE_URL)) {
      connectionString = process.env.DATABASE_URL.trim();
      console.log('Using DATABASE_URL (internal)');
    } else {
      console.log('DATABASE_URL exists but failed validation');
    }
  }
  
  if (!connectionString && process.env.POSTGRES_URL) {
    if (isValidConnectionString(process.env.POSTGRES_URL)) {
      connectionString = process.env.POSTGRES_URL.trim();
      console.log('Using POSTGRES_URL');
    } else {
      console.log('POSTGRES_URL exists but failed validation');
    }
  }
  
  if (!connectionString && process.env.POSTGRES_HOST) {
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
  }
  
  if (!connectionString && !config) {
    // Try to get from Railway's automatically injected variables
    // Railway sometimes injects variables with different names
    const allEnvKeys = Object.keys(process.env);
    const dbRelatedKeys = allEnvKeys.filter(k => 
      k.includes('DATABASE') || 
      k.includes('POSTGRES') || 
      k.includes('PG')
    );
    
    console.log('Available database-related env vars:', dbRelatedKeys);
    
    // Try to find any postgres connection string in env
    for (const key of dbRelatedKeys) {
      const value = process.env[key];
      if (value && typeof value === 'string' && value.includes('postgres')) {
        if (isValidConnectionString(value)) {
          connectionString = value.trim();
          console.log(`Using ${key} for database connection`);
          break;
        }
      }
    }
    
    // If still no connection, try individual parts
    if (!connectionString && !config) {
      const pgHost = process.env.PGHOST || process.env.POSTGRES_HOST;
      const pgPort = process.env.PGPORT || process.env.POSTGRES_PORT || '5432';
      const pgDatabase = process.env.PGDATABASE || process.env.POSTGRES_DATABASE || 'railway';
      const pgUser = process.env.PGUSER || process.env.POSTGRES_USER || 'postgres';
      const pgPassword = process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD;
      
      if (pgHost && pgUser && pgPassword) {
        config = {
          host: pgHost,
          port: parseInt(pgPort),
          database: pgDatabase,
          username: pgUser,
          password: pgPassword,
          dialect: 'postgres',
          logging: false
        };
        console.log('Using PostgreSQL connection from individual environment variables');
      }
    }
    
    // Last resort: throw error only if absolutely nothing found
    if (!connectionString && !config) {
      if (process.env.NODE_ENV === 'production') {
        console.error('No valid database connection found. Available env vars:', dbRelatedKeys);
        throw new Error('DATABASE_URL, POSTGRES_URL, or PostgreSQL connection details are required in production');
      }
      connectionString = 'postgres://postgres:postgres@localhost:5432/recipehub';
      console.log('Using localhost PostgreSQL (development mode)');
    }
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
