import { pool } from "../config/db";

export const createTransactionService = async (
  user_id: number,
  description: string,
  status: string,
  source: string,
  amount: number,
  type: string,
  category_id?: number,
  account_id?: number
) => {
  const accountCheck = await pool.query(
    "SELECT * FROM tblaccount WHERE id = $1 AND user_id = $2",
    [account_id, user_id]
  );
  if (account_id && accountCheck.rowCount === 0) {
    throw new Error("Invalid account: does not belong to this user");
  }
  const result = await pool.query(
    `INSERT INTO tbltransaction
    (user_id, description, status, source, amount, type, category_id, account_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [
      user_id,
      description,
      status || "pending",
      source,
      amount,
      type || "income",
      category_id,
      account_id,
    ]
  );
  return result.rows[0];
};

export const getAllTransactionsService = async (id: number) => {
  const result = await pool.query(
    "SELECT * FROM tbltransaction where user_id =$1 ORDER BY createdAt DESC",
    [id]
  );
  return result.rows;
};

export const getTransactionByIdService = async (
  id: number,
  user_id: number
) => {
  const result = await pool.query(
    "SELECT * FROM tbltransaction where id=$1 and user_id=$2",
    [id, user_id]
  );
  return result.rows[0];
};

export const deleteTransactionService = async (id: number, user_id: number) => {
  const result = await pool.query(
    "DELETE FROM tbltransaction WHERE id=$1 and user_id =$2 RETURNING *",
    [id, user_id]
  );
  return result.rows[0];
};

export const updateTransactionService = async (
  user_id: number,
  id: number,
  description: string,
  status: string,
  source: string,
  amount: number,
  type: string,
  category_id?: number,
  account_id?: number
) => {
  const result = await pool.query(
    `UPDATE tbltransaction
     SET description=$1, status=$2, source=$3, amount=$4, type=$5, category_id=$6, account_id=$7, updatedAt=NOW()
     WHERE id=$8 and user_id=$9 RETURNING *`,
    [
      description,
      status,
      source,
      amount,
      type,
      category_id,
      account_id,
      id,
      user_id,
    ]
  );
  return result.rows[0];
};
