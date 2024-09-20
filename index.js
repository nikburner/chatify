const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const attachSocketIo = require('./utils/attachSocketIo');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true
  }
});
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(attachSocketIo(io));

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-user-room', (userId) => {
    socket.join(`user_${userId}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});