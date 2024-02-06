const {Router} = require('express');
const roomRouters = require('./rooms');

const router = Router();

router.use('/', roomRouters);

module.exports = router;
