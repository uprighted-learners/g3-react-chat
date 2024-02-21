const mongoose = require('mongoose');
const {Router} = require('express');
const isAdmin = require('../middleware/isAdmin');
const Message = require('../../models/Messages');
const router = Router();
const sendErrorResponse = require('../../utils/errorHandler');
const checkMissingFields = require('../middleware/checkMissingFields');

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

router.get('/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const message = await Message.find({roomId: roomId}).sort({createdAt: -1}).limit(20);
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

router.post('/create', checkMissingFields('userId', 'roomId', 'message'), async (req, res) => {
  try {
    const {userId, roomId, message} = req.body;

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

router.delete(`/delete/:messageId`, async (req, res) => {
  try {
    const messageId = req.params.messageId;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({
        success: false,
        message: error.INVALID_MESSAGE_ID,
      });
    }

    const deletedMessage = await Message.findOneAndDelete({
      _id: mongoose.Types.ObjectId(messageId),
    });

    if (!deletedMessage) {
      return res.status(404).json({
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

router.patch('/update', checkMissingFields('user, messageId', 'newMessage'), isAdmin, async (req, res) => {
  try {
    const {messageId, newMessage} = req.body;

    const foundMessage = await Message.findOneAndUpdate({_id: messageId}, {message: newMessage}, {new: true});

    if (!foundMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'Message updated successfully',
        foundMessage,
      });
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

module.exports = router;
