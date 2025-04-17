# Use the official Node.js LTS image as a base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files from client directory
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client app
COPY client/ .

# Build your app
RUN npm run build

# Install serve and start the app
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3535"]
