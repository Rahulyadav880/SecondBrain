import mongoose, {model, Schema} from "mongoose";
import { string } from "zod";

mongoose.connect("mongodb+srv://ry9064526713_db_user:VqUkj5D8KAmgZuWs@cluster0.ng5nrcg.mongodb.net/")
const userSchema = new Schema({
    firstName : String,
    lastName : String,
    email : {type : String, unique : true},
    password : String
})

export const UserModel = model("users", userSchema);


