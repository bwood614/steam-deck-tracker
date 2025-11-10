    # Use a lightweight Node.js image
    FROM node:alpine

    # Set the working directory inside the container
    WORKDIR /usr/src/app

    # Copy package.json and package-lock.json to install dependencies
    COPY package*.json ./

    # Install application dependencies
    RUN npm install

    # Copy the rest of the application code
    COPY . .

    # Expose the port your Express app listens on
    EXPOSE 3000

    # Command to run your application
    CMD [ "node", "server.mjs" ]