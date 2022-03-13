const jwt = require('jsonwebtoken');
const bCrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModal');

//@desc Set User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name = '', email = '', password = '' } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exist');
  }

  // hash password
  const salt = await bCrypt.genSalt(10);
  const hashedPassword = await bCrypt.hash(password, salt);

  // Created User
  const user = await User.create({
    name,
    password: hashedPassword,
    email,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJwt(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

//@desc Login User
//@route POST /api/goals/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password = '' } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password to login');
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('Please provide valid email and password to login');
  }
  const comparePassword = await bCrypt.compare(password, user?.password);

  if (user && comparePassword) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJwt(user._id),
    });
  } else {
    res.json(400);
    throw new Error('Email or password is incorrect.');
  }
});

//@desc Get User
//@route GET /api/goals/me
//@access Public
const getUserMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req?.user?.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//Generate JWT
const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserMe,
};
