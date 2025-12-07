FROM node:18-alpine

WORKDIR /app

# Copy package files from backend directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files from backend directory
COPY backend/ ./

# Expose port
EXPOSE 10000

# Start the application
CMD ["node", "index.js"]
