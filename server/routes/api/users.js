const mongoose = require('mongoose');
const {Router} = require('express');
const User = require('../../models/Users');
const router = Router();

router.patch('/update', async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body;
    const userId = req.user.id;

    if (!firstName && !lastName && !email && !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // this is a good example for function exaction?
    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      user.password = bcryptjs.hashSync(password, SALT);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error,
    });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    await user.remove();

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error,
    });
  }
});
