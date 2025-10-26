import express = require("express");
import asyncHandler from "express-async-handler";
import { Response,Request,NextFunction } from "express";

import{ createUserService, deleteUserService, getUserService, updateUserService} from "../services/userService";

const createUser = asyncHandler(async(req:Request,res:Response)=>{
   const user = await createUserService(
    req.body.email,
    req.body.fullName,
    req.body.password
   )
   res.status(201).json(user);
});

const getUser = asyncHandler(async(req:Request,res:Response)=>{
    const user = await getUserService(
        Number(req.body.params)
    )
    if(!user){
        res.status(404)
        throw new Error("user not found");
    }
    res.status(200).json(user);

});

const deleteUser = async(req:Request,res:Response)=>{
    const user = await deleteUserService(Number(req.body.params));
        if(!user){
        res.status(404)
        throw new Error("user not found");
    }
    res.status(200).json(user);
}

const updateUser = async(req:Request,res:Response)=>{
    const user = await updateUserService(
        Number(req.body.params),
        req.body.email,
        req.body.fullName,
        req.body.password
    )
    if(!user){
        res.status(404)
        throw new Error("user not found");
    }
    res.status(200).json(user);

}
module.exports = {createUser,getUser,deleteUser,updateUser};