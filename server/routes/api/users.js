import User from '../models/User.js';

const createUser = async (req, res) => {
  const {firstName, lastName, email, password} = req.body;

  try {
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
      password,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      data: {
        User: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error,
    });
  }
};

export default {createUser};
