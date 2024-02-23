const {Router} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../../models/Users');
const checkMissingFields = require('../middleware/checkMissingFields');
const sendErrorResponse = require('../../utils/errorHandler');
const router = Router();
const SALT = 10;

router.get('/:id?', async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is missing in the request',
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User name fetched successfully',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

router.patch('/update', checkMissingFields('userId', 'firstName', 'lastName', 'email', 'password'), async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    updateUserFields(user, req.body);
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
    sendErrorResponse(error, res);
  }
});

router.delete('/delete', checkMissingFields('userId'), async (req, res) => {
  try {
    const userId = req.body.userId;

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
    sendErrorResponse(error, res);
  }
});

module.exports = router;

const updateUserFields = (user, fields) => {
  Object.keys(fields).forEach((key) => {
    // only update fields with new information
    if (fields[key] !== undefined && fields[key] !== null) {
      if (key === 'password') {
        user[key] = bcryptjs.hashSync(fields[key], SALT);
      } else {
        user[key] = fields[key];
      }
    }
  });
};
