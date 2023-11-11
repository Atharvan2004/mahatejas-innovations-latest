import express from "express";
import { conn } from "./models/conn.js";
import bodyParser from "body-parser";
import { router } from "./routes/api/productRoute.js";
import { Urouter } from "./routes/api/userRoute.js";
import cookieParser from "cookie-parser";
import { Orouter } from "./routes/api/orderRoute.js";
import { Arouter } from "./routes/api/adminRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

conn();
app.use("/api", router);
app.use("/user", Urouter);
app.use("/order", Orouter);
app.use("/admin", Arouter);

// serve frontend
app.use(express.static(path.join(__dirname, "./client/dist/")));

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});
