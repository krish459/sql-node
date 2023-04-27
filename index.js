import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes");
  return rows;
}

async function getNote(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM notes
    WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}

async function createNote(title, conents) {
  const [result] = await pool.query(
    `
    INSERT INTO notes (title, conents)
    VALUES (?, ?)
    `,
    [title, conents]
  );

  return result.insertId;   
}

const notes = await getNotes();
const notes1 = await getNote(1);
const notes2 = await createNote("test", "test1");
console.log(notes);
