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

const createTransaction = asyncHandler( async (req: Request, res: Response) => {
    const transaction = await createTransactionService(
     req.body.user_id,
     req.body.description,
     req.body.status,
     req.body.source,
     req.body.amount,
     req.body.type,
     req.body.category_id,
     req.body.account_id,
    );
    res.status(201).json(transaction);
});

const getAllTransactions = asyncHandler (async (req: Request, res: Response) => {
    const transactions = await getAllTransactionsService();
    res.status(200).json(transactions);
});

const getTransactionsById = asyncHandler (async (req: Request, res: Response) => {
  const transaction = await getTransactionByIdService(
    Number(req.params.id)
  );

  if(!transaction){
    res.status(404);
    throw new Error ("Transaction not found");
  }
  res.status(200).json(transaction);
  
});

const updateTransaction = asyncHandler (async (req: Request, res: Response) => {
   const transaction = await updateTransactionService(
    Number(req.params.id),
    req.body.description,
    req.body.status,
    req.body.source,
    req.body.amount,
    req.body.type,
    req.body.category_id,
    req.body.account_id
   );

  if(!transaction){
    res.status(404);
    throw new Error ("Transaction not found");
  }
  res.status(200).json(transaction);

});

const deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
  const transaction = await deleteTransactionService(Number(req.params.id));
  if(!transaction){
    res.status(404);
    throw new Error("Transaction not found");
  }
  res.status(200).json(transaction);
});

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionsById,
  updateTransaction,
  deleteTransaction,
};
