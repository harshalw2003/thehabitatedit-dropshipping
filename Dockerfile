# Use official Node image
FROM node:18

# Set working directory
WORKDIR .

# Copy backend and install dependencies
COPY backend ./backend
WORKDIR ./backend
RUN npm install

# Copy frontend and install dependencies
WORKDIR ./view
COPY view ./view    
RUN npm install

# Install a process manager to run both servers
RUN npm install -g concurrently

# Set working directory back to root
WORKDIR .

# Expose backend and frontend ports
EXPOSE 8001 3000

# Start both servers concurrently
CMD concurrently "cd backend && npm run dev" "cd view && npm start"
