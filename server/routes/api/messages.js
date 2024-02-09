const mongoose = require('mongoose');
const { Router } = require('express');
const isAdmin = require('../middleware/isAdmin');
const Message = require('../../models/Messages');
const router = Router();

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
    console.log(error);
    res.status(this.status).json({
      success: false,
      message: this.error,
      error,
    });
  }
});

// router.get('/message/:id', (req, res) => {
//   const messageId = parseInt(req.params.id);
//   db.query('SELECT * FROM messages WHERE id = ?', [messageId], (err, rows) => {
//     if (err) {
//       res.status(500).json({error: err.message});
//       return;
//     }
//     if (rows.length === 0) {
//       res.status(404).json({error: 'Message not found'});
//       return;
//     }
//     res.json(rows[0]);
//   });
// });

router.post('/create', async (req, res) => {
  try {
    const { userId, roomId, message } = req.body;
    if (!userId || !roomId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }
    const newMessage = new Message({
      userId,
      roomId,
      message,
    });
    await newMessage.save();

    res.status(201).json({
      success: true,
      data: {
        message: newMessage,
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

router.delete('/delete', isAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'No message selected for deletion',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message id',
      });
    }

    if (await Message.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })) {
      return res.status(200).json({
        success: true,
        data: {
          message: 'Message deleted.',
        },
      });
    } else {
      return res.status(200).json({
        success: false,
        data: {
          message: 'Cannot find message to be delete.',
        },
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
    console.log(error);
    res.status(this.status).json({
      success: false,
      message: this.error,
      error,
    });
  }
});
module.exports = router;
