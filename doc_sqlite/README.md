## sqlite3を使用する
```
npm install sqlite3
```
次に、db.ts ファイルを作成して、データベースの初期化と操作を行う関数を定義します。
```ts
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
```

そして、shoppingRoutes.ts を以下のように更新して、データベース操作を行う関数を使用します。

```ts
// src/routes/shoppingRoutes.ts
import { Router, Request, Response } from "express";
import { getAllItems, addItem, updateItem, deleteItem } from "./db";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  getAllItems((err, items) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch items" });
    } else {
      res.json(items);
    }
  });
});

router.post("/", (req: Request, res: Response) => {
  addItem(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to add item" });
    } else {
      res.status(201).json(req.body);
    }
  });
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  updateItem(id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to update item" });
    } else {
      res.status(200).json(req.body);
    }
  });
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  deleteItem(id, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete item" });
    } else {
      res.status(200).json({ message: "Item deleted" });
    }
  });
});

export const shoppingRoutes = router;
```

app.ts にデータベースの初期化を追加して、shoppingRoutes を使うように更新しましょう。

```ts
// src/app.ts
import express from "express";
import cors from "cors";
import { shoppingRoutes } from "./routes/shoppingRoutes";
import { initializeDatabase } from "./db";

const app = express();

// Initialize the database
initializeDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/shopping", shoppingRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```
