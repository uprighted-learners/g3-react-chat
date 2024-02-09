const mongoose = require('mongoose');
const { Router } = require('express');
const isAdmin = require('../middleware/isAdmin');
const Room = require('../../models/Rooms');
const router = Router();

router.get('/', async (req, res) => {
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
router.post('/create', async (req, res) => {
  const { name, description, addedUsers } = req.body;

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
    console.log(error);
    res.status(this.status).json({
      success: false,
      message: this.error,
      error,
    });
  }
});

//delete room
router.delete('/delete', isAdmin, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'No room selected for deletion',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid room id',
      });
    }

    if (await Room.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })) {
      return res.status(200).json({
        success: true,
        data: {
          message: 'Room deleted.',
        },
      });
    } else {
      return res.status(200).json({
        success: false,
        data: {
          message: 'Room does not exist.',
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

//update room
router.patch('/update', isAdmin, async (req, res) => {
  try {
    const { id, name, description, addedUsers } = req.body;

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

    const updatedRoom = await Room.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      { name, description, addedUsers },
      { new: true },
    );

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
    res.status(this.status).json({
      success: false,
      message: this.error,
      error,
    });
  }
});

module.exports = router;
