import express, {Express} from "express";
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

import {Login} from "./Login"

const app: Express = express();
app.use(cors());
app.use(express.json());
app.listen(3000, ()=>{
    console.log("Server running on Port 3000")
})

app.put("/signin", async(req,res)=>{
    try{
      const login = new Login();
      const users :any = await login.getUsers();
      let isAvailable = true;
      users.forEach((user:any) => {
        if(user.username===req.body.username){
          console.log("already")
          isAvailable = false;
          
        }
      })
      if(isAvailable){
        const user: any = await login.signinUser(req.body.username, req.body.password);
        res.status(200).json(user)
      }else{
        res.status(300).json({msg: "username already exists"})
      }
    }catch(err){
      res.status(400).json(err);
    }
  
  })
  
app.put("/login",async(req,res)=>{
    try{
      const login = new Login();
      const user:any = await login.getUser(req.body.username, req.body.password);
      const jwtToken = jwt.sign(
        user,
        process.env.JWT_SECRET,
      );
      console.log(jwtToken)
      res.status(200).json(jwtToken)
      }catch(err){
          console.log(err);
          res.status(300).json(err);
      }
})
  