const mongoose = require('mongoose');
const {Router} = require('express');
const isAdmin = require('../middleware/isAdmin');
const Room = require('../../models/Rooms');
const router = Router();
const sendErrorResponse = require('../../utils/errorHandler');
const checkMissingFields = require('../middleware/checkMissingFields');

router.get('/:roomId?', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    let rooms = '';
    if (roomId) {
      rooms = await Room.findOne({roomId});
    } else {
      rooms = await Room.find({});
    }
    res.status(200).json({
      success: true,
      data: {
        rooms,
      },
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

//create new room
router.post('/create', checkMissingFields('name', 'description', 'addedUsers'), async (req, res) => {
  const {name, description, addedUsers} = req.body;

  try {
    const newRoom = await Room.create({
      name,
      description,
      addedUsers,
    });

    res.status(201).json({
      success: true,
      data: {
        room: newRoom,
      },
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

//delete room
router.delete('/delete', isAdmin, checkMissingFields('roomId'), async (req, res) => {
  try {
    const roomId = req.body.roomId;

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid room id',
      });
    }

    if (await Room.findOneAndDelete({_id: mongoose.Types.ObjectId(roomId)})) {
      return res.status(200).json({
        success: true,
        data: {
          message: 'Room deleted.',
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        data: {
          message: 'Room not found.',
        },
      });
    }
  } catch (error) {
    sendErrorResponse(error, res);
  }
});

//update room
router.patch('/update', isAdmin, checkMissingFields('roomId', 'name', 'description', 'addedUsers'), async (req, res) => {
  try {
    const {roomId, name, description, addedUsers} = req.body;

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid message id',
      });
    }

    const updatedRoom = await Room.findOneAndUpdate({_id: mongoose.Types.ObjectId(roomId)}, {name, description, addedUsers}, {new: true});

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
    sendErrorResponse(error, res);
  }
});

module.exports = router;
