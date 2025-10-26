import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoryService,
  getTransactionsByCategoryService,
} from "../services/categoryService";


export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, type } = req.body;

  if (!name || !type) {
    res.status(400);
    throw new Error("Please provide both category name and type");
  }

  const category = await createCategoryService(name, type);
  res.status(201).json({
    message: "Category created successfully",
    category,
  });
});


export const getAllCategory = asyncHandler(async (req: Request, res: Response) => {
  const categories = await getAllCategoryService();

  if (!categories || categories.length === 0) {
    res.status(404);
    throw new Error("No categories found");
  }

  res.status(200).json(categories);
});


export const getTransactionsByCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const transactions = await getTransactionsByCategoryService(Number(id));

  if (!transactions || transactions.length === 0) {
    res.status(404);
    throw new Error("No transactions found for this category");
  }

  res.status(200).json(transactions);
});

export default {
  createCategory,
  getAllCategory,
  getTransactionsByCategory,
};
