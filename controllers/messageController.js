const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sendMessage = async (req, res) => {
  const { content, recipientId } = req.body;
  const senderId = req.user.userId;

  try {
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        recipientId: parseInt(recipientId),
      },
      include: {
        sender: true,
        recipient: true,
      },
    });

    // Emit the message in real-time via Socket.IO
    req.io.to(`user_${recipientId}`).emit('new-message', message);
    req.io.to(`user_${senderId}`).emit('new-message', message);

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const getMessages = async (req, res) => {
  const { otherUserId } = req.params;
  const userId = req.user.userId;

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, recipientId: parseInt(otherUserId) },
          { senderId: parseInt(otherUserId), recipientId: userId }
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        sender: true,
        recipient: true,
      },
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};