# server/Dockerfile
# Build a minimal Node image for the API

FROM node:20-alpine

# Create app directory inside container
WORKDIR /app

 # Copy package.json + package-lock.json if exists
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy Source Code
COPY src ./src

# Expose Port (matches PORT  Env)
EXPOSE 5000

# Set default env (will be overridden by docker-compose)
ENV NODE_ENV=production

# Start the server
CMD ["node", "src/index.js"]