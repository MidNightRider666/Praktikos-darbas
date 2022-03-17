const mysql = require('mysql2/promise');
const {dbConfig} = require('../dbConfig');

const tableName = 'users';

async function CreateUser(full_name, email, password) {
    try {
      const conn = await mysql.createConnection(dbConfig);
      const sql = `
      INSERT INTO ${tableName} (full_name, email, password)
      VALUES (?, ?, ?)
      `;
      const [insertResult] = await conn.execute(sql, [full_name, email, password]);
      await conn.close();
      return insertResult;
    } catch (error) {
      return false;
    }
}

async function findUserWithEmail(email) {
    try {
      const conn = await mysql.createConnection(dbConfig);
      const sql = `
      SELECT * FROM ${tableName}
      WHERE email = ?
      `;
      const [userFound] = await conn.execute(sql, [email]);
      await conn.close();
      return userFound;
    } catch (error) {
      return false;
    }
  }

module.exports = {
    CreateUser,
    findUserWithEmail
}