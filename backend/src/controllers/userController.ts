import express = require("express");
import asyncHandler from "express-async-handler";
import { Response,Request,NextFunction } from "express";

const createUser = asyncHandler(async(req:Request,res:Response)=>{
   
});

const getUser = asyncHandler(async(req:Request,res:Response)=>{

});

const deleteUser = async(req:Request,res:Response)=>{

}

const updateUser = async(req:Request,res:Response)=>{

}
module.exports = {createUser,getUser,deleteUser,updateUser};