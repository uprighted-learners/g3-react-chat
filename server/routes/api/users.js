const { Router } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../../models/Users');
const router = Router();
const SALT = 10;

router.patch('/update', async (req, res) =>
  try {
    const { id, ...updateFields } = req.body;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    Object.keys(updateFields).forEach((key) => {
      user[key] = updateFields[key];
    });

    if (updateFields.password) {
      user.password = bcryptjs.hashSync(updateFields.password, SALT);
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
    sendErrorResponse(error, res);
  }
});
// router.patch('/update', async (req, res) => {
//   try {
//     const { id, firstName, lastName, email, password } = req.body;

//     if (!firstName && !lastName && !email && !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields',
//       });
//     }

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     // this is a good example for function exaction?
//     if (firstName) {
//       user.firstName = firstName;
//     }

//     if (lastName) {
//       user.lastName = lastName;
//     }

//     if (email) {
//       user.email = email;
//     }

//     if (password) {
//       user.password = bcryptjs.hashSync(password, SALT);
//     }

//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: 'User updated successfully',
//       data: {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     sendErrorResponse(error, res);
//   }
// });

router.delete('/delete', async (req, res) => {
  try {
    const userId = req.body.id;

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
