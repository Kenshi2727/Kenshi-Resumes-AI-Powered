# Stage 1: Build the Application
FROM node:23 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

ARG VITE_GOOGLE_AI_API_KEY=${VITE_GOOGLE_AI_API_KEY}
ARG VITE_BASE_URL=${VITE_BASE_URL}
ARG VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
ARG VITE_STRAPI_API_KEY=${VITE_STRAPI_API_KEY}

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

#Stage 2: Run the App with a Minimal Image
FROM node:23-slim

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
# Only copy the build output
COPY --from=builder /app/dist ./dist 

# Expose the application port
EXPOSE 4173

# Run the application
CMD ["npm", "run", "preview", "--", "--host"]