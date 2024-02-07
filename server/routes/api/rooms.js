const {Router} = require('express');
const Room = require('../../models/Rooms');

const router = Router();

router.post('/room', async (req, res) => {
  const {name, description, addedUsers} = req.body;

  try {
    if (!name || !description || !addedUsers) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const newRoom = new Room({
      name,
      description,
      addedUsers,
    });

    await newRoom.save();

    res.status(201).json({
      success: true,
      data: {
        room: newRoom,
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
