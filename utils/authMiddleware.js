const jwt = require('jsonwebtoken');
const SECRET = 'chat-app-jwt';

const authenticateToken = (req, res, next) => {
<<<<<<< HEAD
  // const token = req.headers['authorization'];
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
=======
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
>>>>>>> 268b1808510ad8ec53727b2f3504d27760b2a060
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
