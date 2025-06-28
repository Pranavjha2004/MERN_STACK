import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{
    const {username,email,password} = req.body;
    const hashed = await bcrypt.hash(password,10);

    try{
        const user = await userModel.create({
            username,
            email,
            password: hashed
        });
        res.status(201).json({message: "User Registered Successfully!!"});
    }
    catch (err) {
  if (err.code === 11000) {
    res.status(400).json({ error: "Username or Email already exists" });
  } else {
    console.error("Register error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

};

export const login = async (req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({error: "Invalid Credentials!!"});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});

    res.cookie('token',token, {
        httpOnly: true,
        sameSite: "Strict",
        secure: false, // true in production (HTTPS)
        maxAge: 24*60*60*1000
    });

    res.json({message: "Login Successful"});
};

export const logout = async (req,res)=>{
    res.clearCookie("token");
    res.json({message: "Logged Out!!"});
};