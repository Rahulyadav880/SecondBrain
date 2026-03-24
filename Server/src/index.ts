import express, {type Request, type Response} from "express";
import jwt from "jsonwebtoken";
import * as z from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "./db.js";
const JWT_USER_PASSWORD = "rahulisworkinghard";
const app = express();
app.use(express.json());

app.post("/api/v1/signup", async(req, res)=>{
    //zod is a library used to validate the input data by defining a schema
    const requireBody = z.object({
        firstName : z.string().min(3).max(50),
        lastName : z.string().min(3).max(50),
        email : z.string().email().min(3).max(50),
        password : z.string().min(3).max(50)    
    })

    // Match the data/schema of requireBody with the data/schema of req.body

    const parseDataWithSuccess = requireBody.safeParse(req.body);
    //if both the data are not of the same schema then show this error
    if(!parseDataWithSuccess.success){
        return res.json({
            message : "Invalid format",
            error : parseDataWithSuccess.error
        })
    }

    const {firstName, lastName, email, password} = req.body;
    try{
        const hashPassword = await bcrypt.hash(password, 10); //salt rounds
    await UserModel.create({
        firstName,
        lastName,
        email,
        password : hashPassword 
    })

    return res.json("You are signed up");

    }catch(e){
       return res.status(403).json({
            message : "User already exists",
            error : e
        })
    }  
})

app.post("/api/v1/signin", async(req : Request, res : Response)=>{
    const {email, password} = req.body;
    const response = await UserModel.findOne({
        email : email
    })
    if(!response || !response.password){
       return res.status(403).json({
            message : "Invalid email or password"
        })
    }
    const passwordMatch = await bcrypt.compare(password, response.password);
    if(passwordMatch){
        const token = jwt.sign({
            id : response._id.toString()
        }, JWT_USER_PASSWORD)

        return res.status(200).json({
            token : token,
            message : "You are signed in"
        })
    }else{
        return res.status(403).json({
            message : "Invalid email or password"
        })
    }
    
})

app.post("/api/v1/content", (req, res)=>{

})

app.get("/api/v1/content", (req, res)=>{

})

app.delete("/api/v1/content", (req, res)=>{

})

app.post("/api/v1/brain/share", (req, res)=>{

})

app.get("/api/v1/brain/:shareLink", (req, res)=>{

})

app.listen(3000, ()=>{
    console.log(`listening to the port ${3000}`);
})