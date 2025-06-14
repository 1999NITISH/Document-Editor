import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Store document content and user sessions
let documentContent = '';
let connectedUsers = new Map();

// Generate random colors for users
const userColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

let colorIndex = 0;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Assign user color and name
  const userColor = userColors[colorIndex % userColors.length];
  colorIndex++;
  
  const user = {
    id: socket.id,
    name: `User ${connectedUsers.size + 1}`,
    color: userColor,
    cursor: 0
  };
  
  connectedUsers.set(socket.id, user);

  // Send current document content and users to new user
  socket.emit('document-content', documentContent);
  socket.emit('user-joined', user);
  
  // Broadcast updated user list to all clients
  io.emit('users-update', Array.from(connectedUsers.values()));

  // Handle text changes
  socket.on('text-change', (data) => {
    documentContent = data.content;
    // Broadcast to all other clients
    socket.broadcast.emit('text-change', {
      content: data.content,
      userId: socket.id,
      timestamp: Date.now()
    });
  });

  // Handle cursor position updates
  socket.on('cursor-change', (position) => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      user.cursor = position;
      connectedUsers.set(socket.id, user);
      // Broadcast cursor position to other users
      socket.broadcast.emit('cursor-update', {
        userId: socket.id,
        position: position,
        user: user
      });
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    connectedUsers.delete(socket.id);
    // Broadcast updated user list
    io.emit('users-update', Array.from(connectedUsers.values()));
    io.emit('user-left', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});