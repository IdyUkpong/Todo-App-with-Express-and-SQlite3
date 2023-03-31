"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.getUserAndTodo = exports.Login = exports.Register = void 0;
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const todoModel_1 = require("../model/todoModel");
const jwtsecret = process.env.JWT_SECRET;
/* ============================EJS API ===================*/
const Register = async (req, res) => {
    try {
        const { email, firstName, password, confirm_password } = req.body;
        const iduuid = (0, uuid_1.v4)();
        const validationResult = utils_1.registerUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render("Register", { error: validationResult.error.details[0].message });
        }
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(password, 8);
        // Create user
        // -check if user exist
        const user = await userModel_1.UserInstance.findOne({
            where: { email: email }
        });
        if (!user) {
            let newUser = await userModel_1.UserInstance.create({
                id: iduuid,
                email,
                firstName,
                password: passwordHash
            });
            // Generate token for user
            const User = await userModel_1.UserInstance.findOne({
                where: { email: email }
            });
            const { id } = User;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30mins" });
            return res.redirect("/login");
        }
        return res.render("Register", { error: "email is already taken" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render("Login", { error: validationResult.error.details[0].message });
        }
        // Generate token for user
        const User = await userModel_1.UserInstance.findOne({
            where: { email: email }
        });
        const { id } = User;
        const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30d" });
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        const validUser = await bcryptjs_1.default.compare(password, User.password);
        console.log(validUser);
        if (validUser) {
            return res.redirect('/dashboard');
        }
        res.render("Login", { error: "Invalid email/password" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.Login = Login;
const getUserAndTodo = async (req, res) => {
    try {
        const getAllUser = await userModel_1.UserInstance?.findAndCountAll({
            include: [
                {
                    model: todoModel_1.TodoInstance,
                    as: "todo"
                }
            ]
        });
        return res.status(200).json({
            msg: "You have succssfully retrieve all data",
            count: getAllUser.count,
            users: getAllUser.rows
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.getUserAndTodo = getUserAndTodo;
const Logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
};
exports.Logout = Logout;
