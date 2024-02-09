//TODO - remove old delete endpoint if new one is successful.

const mongoose = require('mongoose');
const { Router } = require('express');
const isAdmin = require('../middleware/isAdmin');
const Message = require('../../models/Messages');
const router = Router();
const sendErrorResponse = require('../utils/errorHandler');

router.get('/', async (req, res) => {
  try {
    const message = await Message.find({});
    res.status(200).json({
      success: true,
      data: {
        message,
      },
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

router.post('/create', async (req, res) => {
  try {
    const { userId, roomId, message } = req.body;
    if (!userId || !roomId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    //removed the await Save and just added the await .create as a shorter method.
    const newMessage = await Message.create({
      userId,
      roomId,
      message,
    });

    res.status(201).json({
      success: true,
      data: {
        message: newMessage,
      },
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

router.delete('/delete', isAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: error.NO_MESSAGE_SELECTED_FOR_DELETION,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: error.INVALID_MESSAGE_ID,
      });
    }

    const deletedMessage = await Message.findOneAndDelete({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!deletedMessage) {
      return res.status(200).json({
        success: false,
        data: {
          message: 'Cannot find message to be deleted.',
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        data: {
          message: 'Message deleted.',
        },
      });
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

//Old router:delete code....to be removed if new refactored one works.
// router.delete('/delete', isAdmin, async (req, res) => {
//   try {
//     const { id } = req.body;
//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: 'No message selected for deletion',
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid message id',
//       });
//     }

//     if (await Message.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })) {
//       return res.status(200).json({
//         success: true,
//         data: {
//           message: 'Message deleted.',
//         },
//       });
//     } else {
//       return res.status(200).json({
//         success: false,
//         data: {
//           message: 'Cannot find message to be delete.',
//         },
//       });
//     }
//   } catch (error) {
//     console.error();
//     res.status(this.status).json({
//       success: false,
//       message: this.error,
//       error,
//     });
//   }
// });

router.patch('/update', isAdmin, async (req, res) => {
  try {
    const { roomId, message, newMessage } = req.body;
    if (!roomId || !message || !newMessage) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }
    const foundMessage = await Message.findOneAndUpdate(
      { roomId, message },
      { message: newMessage },
    );

    if (!foundMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message or room not found',
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'Message updated successfully',
      });
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

module.exports = router;
