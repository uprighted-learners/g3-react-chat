const {Router} = require('express');
const roomRouters = require('./rooms');
const messageRouters = require('./messages');
const userRouters = require('./users');

const router = Router();

router.use('/room', roomRouters);
router.use('/message', messageRouters);
router.use('/user', userRouters);

module.exports = router;
