# client/Dockerfile
# Multi-stage: build React app, then serve via nginx

# --- Build stage ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of client code
COPY . .

# Build static files into /app/dist
RUN npm run build

# --- Runtime stage ---
FROM nginx:alpine

# Copy built assets to nginx default html dir
COPY --from=build /app/dist /usr/share/nginx/html

# Expose nginx HTTP port
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
