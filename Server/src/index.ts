import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as z from "zod";
import bcrypt from "bcrypt";
import { UserModel } from "./db.js";
const app = express();
app.use(express.json());

app.post("api/v1/signup", async(req, res)=>{
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
        password
    })

    return res.json("You are signed up");

    }catch(e){
       return res.status(403).json({
            message : "User already exists",
            error : e
        })
    }  
})

app.post("api/v1/signin", async(req, res)=>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({
        email
    })
    if(!user || !user.password){
       return res.status(403).json({
            message : "Invalid email or password"
        })
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
       return res.status(401).json({
            message : "Invalid Credentials"
        })
    }
    return res.status(200).json({
        message : "You are signed in"
    })
})

app.post("api/v1/content", (req, res)=>{

})

app.get("api/v1/content", (req, res)=>{

})

app.delete("api/v1/content", (req, res)=>{

})

app.post("api/v1/brain/share", (req, res)=>{

})

app.get("api/v1/brain/:shareLink", (req, res)=>{

})

app.listen(3000, ()=>{
    console.log(`listening to the port ${3000}`);
})