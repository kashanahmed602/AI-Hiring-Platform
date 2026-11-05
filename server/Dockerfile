# Use Node.js LTS image
FROM node:24-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy backend source code
COPY src ./src

# Backend port
EXPOSE 8059

# Start backend
CMD ["npm", "start"]