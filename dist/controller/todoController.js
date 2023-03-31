"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = void 0;
const todoModel_1 = require("../model/todoModel");
const utils_1 = require("../utils/utils");
// export const CreateTodo =async(req:Request | any, res:Response)=>{
//  try{
//     const verified = req.user;
//     const id = uuidv4()
//     // const { description,  completed} = req.body;
//     const todoRecord =  await TodoInstance.create({
//      id,
//      ...req.body,
//      userId: verified.id
//     })
//     return res.status(201).json({
//         msg:"you have successfully created a todo",
//         todoRecord
//     })
//  }catch(err){
//   console.log(err)
//  }
// }
const getTodos = async (req, res) => {
    try {
        //  /todos/get-todos?limit=3&offset=1
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //sequelize findAll or findAndCountAll
        // const getAllTodos = await TodoInstance.findAll();
        const getAllTodos = await todoModel_1.TodoInstance.findAndCountAll({
            limit: limit,
            offset: offset
        });
        return res.status(200).json({
            msg: "You have succssfully retrieve all data",
            count: getAllTodos.count,
            todo: getAllTodos.rows
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getTodos = getTodos;
const updateTodo = async (req, res) => {
    try {
        //todos/update-todo/:id
        const { id } = req.params;
        const { completed } = req.body;
        // Validate with Joi or Zod
        const validationResult = utils_1.updateTodoSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        const updateTodo = await todoModel_1.TodoInstance.findOne({ where: { id } });
        if (!updateTodo) {
            return res.status(400).json({
                error: "Cannot find existing todo",
            });
        }
        const updateRecord = await updateTodo.update({
            completed
        });
        return res.status(200).json({
            msg: "You have updated your todo",
            updateRecord
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await todoModel_1.TodoInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                error: "Cannot find existing todo"
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            msg: "You have successfully deleted your todo",
            deletedRecord
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteTodo = deleteTodo;
