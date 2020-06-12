const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        req.isAuth = true;
      } catch (err) {
        req.isAuth = false;
      }
    } else {
      req.isAuth = false;
    }
  } else {
    req.isAuth = false;
  }
};
