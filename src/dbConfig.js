require('dotenv').config();

module.exports = {
jwt_secret: process.env.JWT_TOKEN_SECRET,
dbConfig : {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
},
}
