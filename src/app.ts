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
