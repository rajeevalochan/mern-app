const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModal');

const protectRoute = asyncHandler(async (req, res, next) => {
  let token = '';
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    try {
      token = req?.headers?.authorization?.split(' ')?.[1] || '';

      //Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get User from the Token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Invalid token');
  }
});

module.exports = { protectRoute };
