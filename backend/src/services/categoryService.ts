import { JwtPayload } from "jsonwebtoken";
import { pool } from "../config/db";


export const createCategoryService = async (name: string, type: string) => {
  const result = await pool.query(
    `INSERT INTO tblcategory (name, type) VALUES ($1, $2) RETURNING *`,
    [name, type]
  );
  return result.rows[0]; 
};


export const getAllCategoryService = async () => {
  const result = await pool.query(`SELECT * FROM tblcategory ORDER BY id ASC`);
  return result.rows;
};


export const getTransactionsByCategoryService = async (categoryId: number,user_id:number) => {
  const result = await pool.query(
    `SELECT t.*
     FROM tbltransactions t
     INNER JOIN tblcategory c ON t.category_id = c.id
     INNER JOIN tbluser u ON t.user_id = u.user_id
     WHERE c.id = $1 and u.user_id=$2`,
    [categoryId,user_id]
  );
  return result.rows;
};
