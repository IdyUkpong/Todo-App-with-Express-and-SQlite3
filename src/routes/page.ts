import express, {NextFunction, Response, Request} from 'express';
import { auth } from '../middlewares/auth';
import {v4 as uuidv4} from 'uuid'
import { TodoInstance } from '../model/todoModel';
import { UserInstance } from '../model/userModel';

const router = express.Router();

// Pages

router.get('/', (req:Request, res:Response, next:NextFunction)=>{
    res.render('Register')
})
//Display Home page
router.get('/dashboard', auth, async(req:Request | any, res:Response)=>{
    try{
       const { id } = req.user
       const {todo} = await UserInstance.findOne({where:{id}, include:{
        model:TodoInstance,
        as:"todo"
       }}) as unknown as any

       return res.render("Home", {
        todolist :todo
       })

   
    }catch(err){
     console.log(err)
    }
   } )


router.get('/login', (req:Request, res:Response, next:NextFunction)=>{
    res.render('Login')
})

// api Create Todo with ejs
router.post('/dashboard', auth , async(req:Request | any, res:Response)=>{
    try{
       const verified = req.user;
   
       const id = uuidv4()
       // const { description,  completed} = req.body;
   
       const todoRecord =  await TodoInstance.create({
        id,
        ...req.body,
        userId: verified.id
       })
   
      return res.redirect("/dashboard")
   
    }catch(err){
     console.log(err)
    }
   } )


   
export default router