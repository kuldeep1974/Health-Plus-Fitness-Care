# Use the official Node.js LTS image as a base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's code
COPY . .

# Build your app (if it's a React/Vue/etc. app)
RUN npm run build

# Install a static server to serve build (for frontend apps like React)
RUN npm install -g serve

# Expose port (default React/Vue port is 3000)
EXPOSE 3000

# Start the app using serve (if it's a frontend build)
CMD ["serve", "-s", "build", "-l", "3000"]
