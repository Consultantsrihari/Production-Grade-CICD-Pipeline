# Stage 1: Build the React application
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the built application from Nginx
FROM nginx:stable-alpine
# Copy the built static files from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html
# Nginx listens on port 80 by default
EXPOSE 80
# When the container starts, nginx will start
CMD ["nginx", "-g", "daemon off;"]