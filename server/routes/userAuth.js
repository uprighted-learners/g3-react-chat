require('dotenv').config();
const router = require('express').Router();
const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT = 10;
const JWT_KEY = process.env.JWT_KEY;

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: bcryptjs.hashSync(password, SALT),
    });
    await newUser.save();

    const token = createUserToken(newUser);
    res.status(201).json({
      success: true,
      data: {
        newUser,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(this.status).json({
      success: false,
      message: this.error,
      error,
    });
  }
});

router.get('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const foundUser = await User.findOne({ email });
    const verifyPwd = await bcryptjs.compareSync(password, foundUser.password);
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
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(this.status).json({
      success: false,
      message: this.error,
      error,
    });
  }
});

module.exports = router;

function createUserToken(user) {
  const token = jwt.sign({ _id: user._id }, JWT_KEY, {
    expiresIn: 60 * 60 * 24,
  });
  return token;
}
