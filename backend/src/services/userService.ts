import {pool} from "../config/db"

export const createUserService = async(email:string,fullName:string,password:string)=>{

    const result = await pool.query( `INSERT INTO tbluser (email, fullName, password)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [email, fullName, password]);
    return result.rows[0];
   
}

export const getUserService = async(id:number)=>{

  const result = await pool.query(`SELECT * from tbluser where id = $1`,[id]);
  return result.rows[0];

}

export const deleteUserService = async(id:number)=>{
    const result = await pool.query(`DELETE FROM tbluser WHERE id = $1 RETURNING *`,[id]);
    return result.rows[0];

}

export const updateUserService = async(id:number,email:string,fullName:string,password:string)=>{
      const result = await pool.query(`UPDATE tbluser
     SET email = $1, fullName = $2, password = $3, updatedAt = NOW()
     WHERE id = $4
     RETURNING *`,
    [email, fullName, password, id]);
   return result.rows[0];

}

exports.module={
    createUserService,
    getUserService,
    deleteUserService,
    updateUserService
}