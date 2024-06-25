# Use the official Node.js image
FROM node:16

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Log the working directory contents before build
RUN echo "Contents of /usr/src/app before build:"
RUN ls -al /usr/src/app

# Build the TypeScript code
RUN npm run build

# Log the working directory contents after build
RUN echo "Contents of /usr/src/app after build:"
RUN ls -al /usr/src/app
RUN ls -al /usr/src/app/dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/server.js"]
