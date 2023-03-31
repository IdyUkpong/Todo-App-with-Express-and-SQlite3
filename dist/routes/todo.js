"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// router.post('/create', auth, CreateTodo);
router.get('/get-todos', auth_1.auth, todoController_1.getTodos);
router.patch('/update-todos/:id', auth_1.auth, todoController_1.updateTodo);
router.delete('/delete-todos/:id', auth_1.auth, todoController_1.deleteTodo);
exports.default = router;
