# Use Node.js as base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose port 3000 for the Next.js dev server
EXPOSE 3000

# Start the Next.js development server
CMD ["npm", "run", "dev"]
