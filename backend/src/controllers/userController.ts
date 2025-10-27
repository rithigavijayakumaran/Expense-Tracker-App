import express = require("express");
import asyncHandler from "express-async-handler";
import { Response, Request, NextFunction } from "express";

import {
  registerUserService,
  deleteUserService,
  updateUserService,
  loginUserService,
} from "../services/userService";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, fullname, password } = req.body;
  if (!email || !password || !fullname) {
    res.status(400);
    throw new Error("all fields are mandatory!");
  }
  const user = await registerUserService(email, fullname, password);
  if (!user) {
    res.status(404);
    throw new Error("Registration Unsuccessfull");
  }
  res.status(201).json({
    message: "User registration successfull",
    user,
  });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory!");
  }
  const user = await loginUserService(email, password);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({
    message: "logged in successfully",
    user,
  });
});

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  res.status(200).json(user);
});

const deleteUser = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("User not Authorised");
  }
  if (req.user.id !== Number(req.params.id)) {
    res.status(403);
    throw new Error("You can only delete your own account");
  }

  const user = await deleteUserService(Number(req.params.id));
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  res.status(200).json({
    message : "User deleted Successfully",
    user
  });
};

const updateUser = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("User not Authorised");
  }
  if (req.user.id !== Number(req.params.id)) {
    res.status(403);
    throw new Error("You can only delete your own account");
  }

  const user = await updateUserService(
    req.user.id,
    req.body.email,
    req.body.fullname,
    req.body.password
  );
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  res.status(200).json(user);
};
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  deleteUser,
  updateUser,
};
