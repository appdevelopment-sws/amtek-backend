FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies for production
RUN npm ci --only=production

# Copy application source code
COPY . .

# Expose the application port
EXPOSE 5001

# Set environment variable to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
