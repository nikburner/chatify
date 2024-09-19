const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sendMessage = async (req, res) => {
  const { content } = req.body;
  const { groupId } = req.params;

  try {
    const message = await prisma.message.create({
      data: {
        content,
        senderId: req.user.userId,
        groupId: parseInt(groupId),
      },
    });

    req.io.to(groupId).emit('message', message);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: 'Failed to send message' });
  }
};

const getMessages = async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: { groupId: parseInt(groupId) },
      include: { sender: true },
    });
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get messages' });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
