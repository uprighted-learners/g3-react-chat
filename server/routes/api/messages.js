// AC1: The endpoint should return a list of all messages within a specified room.
const {Router} = require('express');
const Message = require('../../models/Messages');
const router = Router();

router.get('/messages', async (req, res) => {
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

// Add a new message
// router.post('/', (req, res) => {
//   const {text, user_id} = req.body;
//   const message = {text, user_id};
//   const sql = 'INSERT INTO messages SET ?';
//   db.query(sql, message, (err, result) => {
//     if (err) {
//       res.status(500).json({error: err.message});
//       return;
//     }
//     res.status(201).json({id: result.insertId, ...message});
//   });
// });

// // Update a message
// router.put('/:id', (req, res) => {
//   const messageId = parseInt(req.params.id);
//   const {text, user_id} = req.body;
//   const sql = 'UPDATE messages SET text = ?, user_id = ? WHERE id = ?';
//   db.query(sql, [text, user_id, messageId], (err, result) => {
//     if (err) {
//       res.status(500).json({error: err.message});
//       return;
//     }
//     if (result.affectedRows === 0) {
//       res.status(404).json({error: 'Message not found'});
//       return;
//     }
//     res.sendStatus(204);
//   });
// });

// // Delete a message
// router.delete('/:id', (req, res) => {
//   const messageId = parseInt(req.params.id);
//   db.query('DELETE FROM messages WHERE id = ?', [messageId], (err, result) => {
//     if (err) {
//       res.status(500).json({error: err.message});
//       return;
//     }
//     if (result.affectedRows === 0) {
//       res.status(404).json({error: 'Message not found'});
//       return;
//     }
//     res.sendStatus(204);
//   });
// });

module.exports = router;
