import express,{Request,Response,NextFunction} from 'express';
const router = express.Router();
import {Register, Login, 
    // getUserAndTodo,
    Logout} from '../controller/userController'

/* GET home page. */
router.post('/register', Register);
router.post('/login', Login);
// router.get('/get-user', getUserAndTodo);
router.get('/logout', Logout);

export default router;
