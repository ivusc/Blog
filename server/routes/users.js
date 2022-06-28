import express from 'express';

import { signin, signup, getUsers, getUser, signout, getUserByUsername } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.delete('/signout',signout);
router.get('/',auth,getUsers);
router.get('/getuser',auth,getUser);
router.get('/getuserbyusername/:username',getUserByUsername);


export default router;