require('dotenv').config();
const sendErrorResponse = require('../utils/errorHandler');
const router = require('express').Router();
const User = require('../models/Users');
const Room = require('../models/Rooms');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkMissingFields = require('./middleware/checkMissingFields');
const SALT = 10;
const JWT_KEY = process.env.JWT_KEY;

router.post('/register', checkMissingFields('firstName', 'lastName', 'email', 'password'), async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: bcryptjs.hashSync(password, SALT),
    });

    const token = createUserToken(newUser);
    res.status(201).json({
      success: true,
      data: {
        newUser,
        token,
      },
    });
    await Room.updateOne({_id: '65c29e140513b28af7b13bd7'}, {$addToSet: {addedUsers: newUser._id}});
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

router.post('/login', checkMissingFields('email', 'password'), async (req, res) => {
  try {
    const {email, password} = req.body;

    const foundUser = await User.findOne({email});
    const verifyPwd = bcryptjs.compareSync(password, foundUser.password);
    if (!verifyPwd || !foundUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid information',
      });
    } else {
      // will use token in the future for session
      const token = createUserToken(foundUser);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: foundUser,
        token,
      });
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

module.exports = router;

function createUserToken(user) {
  const token = jwt.sign({_id: user._id}, JWT_KEY, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
}
