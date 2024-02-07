const {Router} = require('express');
const apiRoutes = require('./api');
const userAuth = require('./userAuth');
const router = Router();

router.use('/api', apiRoutes);
router.use('/userAuth', userAuth);

module.exports = router;
