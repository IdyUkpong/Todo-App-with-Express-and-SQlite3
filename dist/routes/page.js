"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const uuid_1 = require("uuid");
const todoModel_1 = require("../model/todoModel");
const userModel_1 = require("../model/userModel");
const router = express_1.default.Router();
// Pages
router.get('/', (req, res, next) => {
    res.render('Register');
});
//Display Home page
router.get('/dashboard', auth_1.auth, async (req, res) => {
    try {
        const { id } = req.user;
        const { todo } = await userModel_1.UserInstance.findOne({ where: { id }, include: {
                model: todoModel_1.TodoInstance,
                as: "todo"
            } });
        return res.render("Home", {
            todolist: todo
        });
    }
    catch (err) {
        console.log(err);
    }
});
router.get('/login', (req, res, next) => {
    res.render('Login');
});
// api Create Todo with ejs
router.post('/dashboard', auth_1.auth, async (req, res) => {
    try {
        const verified = req.user;
        const id = (0, uuid_1.v4)();
        // const { description,  completed} = req.body;
        const todoRecord = await todoModel_1.TodoInstance.create({
            id,
            ...req.body,
            userId: verified.id
        });
        return res.redirect("/dashboard");
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = router;
