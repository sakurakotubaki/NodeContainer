// src/db.ts
import { Database } from "sqlite3";

const db = new Database("database.sqlite");

export const initializeDatabase = () => {
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS shopping (id INTEGER PRIMARY KEY, title TEXT)");
  });
};

export const getAllItems = (callback: (err: Error | null, items: any) => void) => {
  db.all("SELECT * FROM shopping", callback);
};

export const addItem = (item: { title: string }, callback: (err: Error | null) => void) => {
  db.run("INSERT INTO shopping (title) VALUES (?)", [item.title], callback);
};

export const updateItem = (
  id: number,
  item: { title: string },
  callback: (err: Error | null) => void
) => {
  db.run("UPDATE shopping SET title = ? WHERE id = ?", [item.title, id], callback);
};

export const deleteItem = (id: number, callback: (err: Error | null) => void) => {
  db.run("DELETE FROM shopping WHERE id = ?", [id], callback);
};
