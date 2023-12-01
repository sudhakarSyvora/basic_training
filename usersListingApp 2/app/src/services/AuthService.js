const jwt = require("jsonwebtoken");

const extractUserFromToken = (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ authorized: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ authorized: false, message: 'Invalid token' });
  }
};

module.exports = extractUserFromToken;
