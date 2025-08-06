# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to start the application
CMD [ "npm", "start" ]