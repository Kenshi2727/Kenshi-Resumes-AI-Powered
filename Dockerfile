# Stage 1: Build the Application
FROM node:23 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

#Stage 2: Run the App with a Minimal Image
FROM node:23-slim

# Install gettext to provide envsubst
RUN apt-get update && apt-get install -y gettext

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public/env-config.template.js ./dist/env-config.template.js
# Only copy the build output
COPY --from=builder /app/dist ./dist 

# Expose the application port
EXPOSE 4173

#  The  entrypoint.sh  script is used to replace the environment variables in the  env-config.template.js  file with the actual values. 
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "preview", "--", "--host"] 