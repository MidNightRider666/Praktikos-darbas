const mysql = require('mysql2/promise');
const { dbConfig } = require('../dbConfig');

const tableName = 'accounts';
const tablename2 = 'groups';
const tablename3 = 'users';


async function GetAccByUserAndGroups(userId) {
    try {
      const conn = await mysql.createConnection(dbConfig);
      const sql = `
      SELECT groups.id, groups.name 
      FROM ((${tableName} 
      INNER JOIN ${tablename2} ON accounts.group_id = groups.id) 
      INNER JOIN ${tablename3} ON accounts.user_id = users.id)
      WHERE user_id = ?;`
      const [Acc] = await conn.query(sql, [userId]);
      await conn.close();
      return Acc;
    } catch (error) {
      return false;
    }
  }

  async function InsertGroupIntoAcc(group_id, userId) {
    try {
      const conn = await mysql.createConnection(dbConfig);
      const sql = `
      INSERT INTO accounts (group_id, user_id) VALUES (?, ?);
      `;
      const [insertResult] = await conn.execute(sql, [group_id, userId]);
      await conn.close();
      return insertResult;
    } catch (error) {
      return false;
    }
  }




  module.exports = {
    GetAccByUserAndGroups,
    InsertGroupIntoAcc
  }