const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const SECRET = 'chat-app-jwt';

const register = async (req, res) => {
  const { email, password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET);
    res.json({ token, msg: "Login Succeesful" });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: req.user.userId } 
      },
      select: { 
        id: true, 
        email: true, 
        username: true 
      }
    });
    
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  getUsers,
};