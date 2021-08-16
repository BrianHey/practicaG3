const { Pool } = require("pg");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};
const pool = new Pool(config);

const getUser = async (values) => {
  const query = {
    text: "SELECT * FROM users WHERE id = $1;",
    values,
  };
  const resp = await pool.query(query);
  return resp.rows;
};

const getUsers = async () => {
  const query = {
    text: "SELECT * FROM users;",
  };
  const resp = await pool.query(query);
  return resp.rows;
};

const deletUsers = async (values) => {
  const query = {
    text: "DELETE FROM users WHERE id = $1 RETURNING *;",
    values,
  };
  const resp = await pool.query(query);
  return resp.rows;
};

const setUser = async (values) => {
  const query = {
    text: "UPDATE users SET nombre = $2, photoURL = $3, email = $4 WHERE id = $1 RETURNING *;",
    values,
  };
  const res = await pool.query(query);
  return res.rows;
};

module.exports = {
  getUser,
  getUsers,
  deletUsers,
  setUser,
};
