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

const getGroups = async (req, res) => {
  const userId = req.user.userId;  

  try {
    const groups = await prisma.group.findMany({
      where: {
        users: {
          some: {
            id: userId, 
          },
        },
      },
      include: {
        users: true, 
        messages: true,  
      },
    });

    res.json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve groups' });
  }
};

const getGroupById = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await prisma.group.findUnique({
      where: { id: parseInt(groupId) },
      include: {
        users: true,  
        messages: true,  
      },
    });

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json(group);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve group' });
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroupById,
};
