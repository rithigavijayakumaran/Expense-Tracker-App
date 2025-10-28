import express = require("express");
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createTransactionService,
  getAllTransactionsService,
  getTransactionByIdService,
  updateTransactionService,
  deleteTransactionService,
} from "../services/transactionService";

export const createTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const transaction = await createTransactionService(
      req.user.id,
      req.body.description,
      req.body.status,
      req.body.source,
      req.body.amount,
      req.body.type,
      req.body.category_id,
      req.body.account_id
    );
    if (!transaction) {
      res.status(404);
      throw new Error("transaction creation unsuccessfull");
    }
    res.status(201).json({
      message: "Transactions created succesfully",
      transaction,
    });
  }
);

export const getAllTransactions = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const transactions = await getAllTransactionsService(req.user.id);
    res
      .status(200)
      .json({ message: "fetched all transaction successfully", transactions });
  }
);

export const getTransactionsById = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const transaction = await getTransactionByIdService(
      Number(req.params.id),
      req.user.id
    );

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }
    res
      .status(200)
      .json({ message: "fetched transaction successfully", transaction });
  }
);

export const updateTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const transaction = await updateTransactionService(
      req.user.id,
      Number(req.params.id),
      req.body.description,
      req.body.status,
      req.body.source,
      req.body.amount,
      req.body.type,
      req.body.category_id,
      req.body.account_id
    );

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }
    res
      .status(200)
      .json({ message: "updated transaction successfully", transaction });
  }
);

export const deleteTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const transaction = await deleteTransactionService(
      Number(req.params.id),
      req.user.id
    );
    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }
    res
      .status(200)
      .json({ message: "deleted transaction successfully", transaction });
  }
);
