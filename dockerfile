# Use a specific version of the Node.js runtime as the base image
FROM node:latest

# Create app directory
WORKDIR /app

# Create a new user
RUN useradd -m voyant

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Change to the new user
USER voyant

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "index.js" ]