
# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files - ensure this includes the public directory
COPY . .

# Build the React app
RUN npm run build

# Install serve globally to serve static files
RUN npm install -g serve

# Expose port 3535
EXPOSE 3535

# Run the app on port 3535
CMD ["serve", "-s", "build", "-l", "3535"]
