const mysql = require('mysql2/promise');
const { dbConfig } = require('../dbConfig');

const tableName = 'bills';
const tablename2 = 'groups';

async function GetBillsByGroupID(id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT bills.id, bills.amount, bills.description, groups.name AS 'Group'
    FROM ${tableName}
    LEFT JOIN ${tablename2}
    ON bills.group_id = groups.id
    WHERE group_id = ? `;
    const [posts] = await conn.query(sql, [id]);
    await conn.close();
    return posts;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function PostBils(NewBillsData) {
    try {
      const { group_id , amount, description } = NewBillsData;
      const conn = await mysql.createConnection(dbConfig);
      const sql = `INSERT INTO ${tableName} (group_id , amount, description ) VALUES (?, ?, ?)`;
      const [addArticleResult] = await conn.execute(sql, [group_id , amount, description ]);
      await conn.close();
      return addArticleResult;
    } catch (error) {
      console.log('addArticleResult ', error);
      return false;
    }
  }


module.exports = {
  GetBillsByGroupID,
  PostBils
};
