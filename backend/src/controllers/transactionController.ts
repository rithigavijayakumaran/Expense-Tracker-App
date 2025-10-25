import express = require("express");

import { Request, Response } from "express";

const createTransaction = async (req: Request, res: Response) => {};
const getAllTransactions = async (req: Request, res: Response) => {
    console.log("all transactions")
};

const getTransactionsById = async (req: Request, res: Response) => {};

const updateTransaction = async (req: Request, res: Response) => {};

const deleteTransaction = async (req: Request, res: Response) => {};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionsById,
  updateTransaction,
  deleteTransaction,
};
