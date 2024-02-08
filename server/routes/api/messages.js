// AC1: The endpoint should return a list of all messages within a specified room.
const { Router } = require('express');
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
    res.status(500).json({
      success: false,
      message: 'Internal server error',
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

router.post('/createMessage', async (req, res) => {
  try {
    const { timestamp, userId, roomId, message } = req.body;
    if (!timestamp || !userId || !roomId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }
    const newMessage = new Message({
      timestamp,
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
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error,
    });
  }
});

router.delete('/deleteMessage', async (req, res) => {
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

    await Message.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) });

    res.status(200).json({
      success: true,
      data: {
        message: 'Message deleted.',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error,
    });
  }
});

module.exports = router;
