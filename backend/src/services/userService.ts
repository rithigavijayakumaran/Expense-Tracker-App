import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const registerUserService = async (
  email: string,
  fullName: string,
  password: string
) => {
  const existingUser = await pool.query(
    `select from tblUser where email = $1`,
    [email]
  );
  if (existingUser.rows.length > 0) {
    throw new Error("user already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPassword : $1", hashedPassword);
  const result = await pool.query(
    `INSERT INTO tbluser (email, fullName, password)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [email, fullName, hashedPassword]
  );
  return result.rows[0];
};

export const loginUserService = async (email: string, password: string) => {
  const result = await pool.query("SELECT * FROM tbluser WHERE email = $1", [
    email,
  ]);
  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }
  const user = result.rows[0];
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid Password  or email");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "defaultsecret",
    { expiresIn: "1d" }
  );

  return {
    id: user.id,
    fullName: user.fullname,
    email: user.email,
    token,
  };
};

export const getUserService = async (id: number) => {
  const result = await pool.query(`SELECT * from tbluser where id = $1`, [id]);
  return result.rows[0];
};

export const deleteUserService = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM tbluser WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

export const updateUserService = async (
  id: number,
  email: string,
  fullName: string,
  password: string
) => {
  const result = await pool.query(
    `UPDATE tbluser
     SET email = $1, fullName = $2, password = $3, updatedAt = NOW()
     WHERE id = $4
     RETURNING *`,
    [email, fullName, password, id]
  );
  return result.rows[0];
};
