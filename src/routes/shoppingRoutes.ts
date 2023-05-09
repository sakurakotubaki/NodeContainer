// src/routes/shoppingRoutes.ts
import { Router, Request, Response } from "express";
import { getAllItems, addItem, updateItem, deleteItem } from "../db";

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
