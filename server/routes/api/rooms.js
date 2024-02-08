const mongoose = require('mongoose');
const {Router} = require('express');
const isAdmin = require('../middleware/isAdmin');
const Room = require('../../models/Rooms');
const router = Router();

router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json({
      success: true,
      data: {
        rooms,
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

//create new room
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

//delete room
router.delete('/deleteRoom', isAdmin, async (req, res) => {
  try {
    const {id} = req.body;
    console.log(id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'No room selected for deletion',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message id',
      });
    }

    await Room.findOneAndDelete({_id: mongoose.Types.ObjectId(id)});

    res.status(200).json({
      success: true,
      data: {
        message: 'Room deleted.',
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

//update room
router.patch('/updateRoom', isAdmin, async (req, res) => {
  try {
    const {id, name, description, addedUsers} = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'No room selected for update',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message id',
      });
    }

    const updatedRoom = await Room.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {name, description, addedUsers}, {new: true});

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        room: updatedRoom,
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

module.exports = router;
