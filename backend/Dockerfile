FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy Prisma schema (needed for postinstall script)
COPY prisma ./prisma

# Install dependencies (including dev dependencies for Prisma)
# This will trigger postinstall which runs prisma generate
RUN npm install

# Copy rest of application files
COPY . .

# Expose port
EXPOSE 10000

# Start the application
CMD ["node", "server.js"]
