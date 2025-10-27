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
  if (!email || !password) {
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
  const user = await deleteUserService(Number(req.body.params));
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  res.status(200).json(user);
};

const updateUser = async (req: Request, res: Response) => {
  const user = await updateUserService(
    Number(req.body.params),
    req.body.email,
    req.body.fullName,
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
