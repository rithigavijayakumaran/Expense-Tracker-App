import express from "express";
import asyncHandler from "express-async-handler";
import { Response, Request } from "express";

import {
  createAccountService,
  updateAccountService,
  getAccountService,
  deleteAccountService,
} from "../services/accountService";

export const createAccount = asyncHandler(async (req: Request, res: Response) => {
  const { user_id, account_name, account_number, account_balance } = req.body;
  if (!user_id || !account_name || !account_number || account_balance == null) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const newAccount = await createAccountService(
    user_id,
    account_name,
    account_number,
    account_balance
  );

  res.status(201).json({
    message: "Account created successfully",
    account: newAccount,
  });
});

export const updateAccount = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { account_name, account_number, account_balance } = req.body;
  if (!account_number || !account_balance || !account_name == null) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const updateAccount = await updateAccountService(
    Number(id),
    account_name,
    account_number,
    account_balance
  );

  if (!updateAccount) {
    res.status(404);
    throw new Error("Account not found");
  }
  res.status(200).json({
    message: "Account updated successfully",
    account: updateAccount,
  });
});

export const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedAccount = await deleteAccountService(Number(id));

  if (!deletedAccount) {
    res.status(404);
    throw new Error("Account not found");
  }

  res.status(200).json({
    message: "Account deleted successfully",
    account: deletedAccount,
  });
});

export const getAccount = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const account = await getAccountService(Number(id));

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  res.status(200).json(account);
});

