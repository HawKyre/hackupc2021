import sqlite from "sqlite";
import sqlite3 from "sqlite3";

let db;

export default function getDB() {
  if (!db) {
    sqlite
      .open({ filename: "../../db.sqlite", driver: sqlite3.Database })
      .then((database) => {
        db = database;
      });
  }
  return db;
}
