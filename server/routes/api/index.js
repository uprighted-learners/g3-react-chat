const { Router } = require('express');
const roomRouters = require('./rooms');
const messageRouters = require('./messages');

const router = Router();

router.use('/', roomRouters);
router.use('/', messageRouters);

module.exports = router;
