const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createGroup = async (req, res) => {
  const { name, userIds } = req.body;

  if (!Array.isArray(userIds)) {
    return res.status(400).json({ error: 'Invalid userIds' });
  }

  try {
    const group = await prisma.group.create({
      data: {
        name,
        users: {
          connect: userIds.map((id) => ({ id })),
        },
      },
    });
    res.json(group);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Failed to create group' });
  }
};

module.exports = {
  createGroup,
};
