# Use the official Node.js 20 Alpine image from Docker Hub.
FROM node:20-alpine

# Set the working directory inside the container.
# @workdir /usr/src/app
WORKDIR /usr/src/app

# Copy the rest of your application's code from the root directory.
# @copy . .
COPY . .

# Install all dependencies.
# @run yarn install
RUN yarn install

# Build your application.
# @run yarn build
RUN yarn build

# Expose the port the app runs on.
# @expose 5000
EXPOSE 5000

# Command to run your app using Node.
# @cmd node build/server.js
CMD ["node", "build/server.js"]
