const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/groups', groupRoutes);
app.use('/messages', messageRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join-group', (groupId) => {
    socket.join(groupId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
