import express from 'express';
import {
    // CreateTodo, 
    getTodos, 
    updateTodo, 
    deleteTodo
} from '../controller/todoController'
import {auth} from "../middlewares/auth"
const router = express.Router();


// router.post('/create', auth, CreateTodo);
router.get('/get-todos', auth, getTodos);
router.patch('/update-todos/:id', auth, updateTodo);
router.delete('/delete-todos/:id', auth, deleteTodo);

export default router;
