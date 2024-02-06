import {Router} from 'express';
import {createUser} from './users';
import {addMessage} from './messages';
import {createRoom} from './rooms';

const router = Router();

router.post('/rooms', createRoom);
router.post('/users', createUser);
router.post('/messages', addMessage);

export default router;
