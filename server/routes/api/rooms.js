import Room from '../models/Room.js';

const createRoom = async (req, res) => {
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
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error,
    });
  }
};

export default { createRoom };
