import express from "express";
import asyncHandler from "express-async-handler";
import { Response, Request } from "express";

import {
  createAccountService,
  updateAccountService,
  getAccountService,
  deleteAccountService,
  getAllAccountsService,
} from "../services/accountService";

export const createAccount = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const user_id = req.user.id;
    const { account_name, account_number, account_balance=0} = req.body;
    if (
      !user_id ||
      !account_name ||
      !account_number ||
      account_balance == null
    ) {
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
  }
);

export const updateAccount = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const user_id = req.user.id;

    const { id } = req.params;
    const { account_name, account_number, account_balance } = req.body;
    if (!account_name||!account_number || !account_balance  == null) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const account = await getAccountService(Number(id));

    if (account.user_id != user_id) {
      res.status(403);
      throw new Error(
        "User dont have permissions to update other user Account"
      );
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
  }
);

export const deleteAccount = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const user_id = req.user.id;
    const { id } = req.params;
    const account = await getAccountService(Number(id));
    if (account.user_id != user_id) {
      res.status(403);
      throw new Error(
        "User does not have permission to delete this account"
      );
    }

    const deletedAccount = await deleteAccountService(Number(id));

    if (!deletedAccount) {
      res.status(404);
      throw new Error("Account not found");
    }

    res.status(200).json({
      message: "Account deleted successfully",
      account: deletedAccount,
    });
  }
);

export const getAccount = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const user_id = req.user.id;
  const account = await getAccountService(Number(id));
  if (account.user_id != user_id) {
    res.status(403);
    throw new Error("you are not authorized to view this account");
  }

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  res.status(200).json(account);
});

export const getAllAccountsOfUser = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const user_id = req.user.id;
  
    const accounts = await getAllAccountsService(user_id);
    if (!accounts) {
      res.status(404);
      throw new Error("Accounts not found");
    }

    res.status(200).json({ message: "All acoounts of the user", accounts });
  }
);
