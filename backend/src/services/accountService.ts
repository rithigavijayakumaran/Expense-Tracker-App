import { pool } from "../config/db";

export const createAccountService = async (
  user_id: number,
  account_name: string,
  account_number: string,
  account_balance: number
) => {
  const result = await pool.query(
    `INSERT INTO tblaccount (user_id, account_name, account_number, account_balance)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [user_id, account_name, account_number, account_balance]
  );
  return result.rows[0];
};

export const getAccountService = async (id: number) => {
  const result = await pool.query(
    `SELECT * FROM tblaccount where user_id = $1`,
    [id]
  );
  return result.rows[0];
};

export const updateAccountService = async (
  id: number,
  account_name: string,
  account_number: string,
  account_balance: number
) => {
  const result = await pool.query(
    `UPDATE tblaccount
     SET account_name = $1, account_number = $2, account_balance = $3, updatedAt = NOW()
     WHERE id = $4
     RETURNING *`,
    [account_name, account_number, account_balance, id]
  );
  return result.rows[0];
};

export const deleteAccountService = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM tblaccount WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};
