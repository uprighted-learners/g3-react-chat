const {Router} = require('express');
const roomRouters = require('./rooms');
const messageRouters = require('./messages');
const userRouters = require('./users');

const router = Router();

router.use('/', roomRouters);
router.use('/', messageRouters);
router.use('/', userRouters);

module.exports = router;
