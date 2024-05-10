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
await conn();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const allowedOrigins = [
  'https://mahatejas-innovations-latest-f-atharvans-projects.vercel.app',
  'https://mahatejas-innovations-latest-f-git-main-atharvans-projects.vercel.app',
  'mahatejas-innovations-latest-f.vercel.app',
];
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);
app.use("/user", Urouter);
app.use("/order", Orouter);
app.use("/admin", Arouter);
console.log(__dirname)
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});
// // serve frontend
// app.use(express.static(path.join(__dirname, "./client/dist/")));
//
// app.get("*", (req,res) => {
//   res.sendFile(path.join(__dirname, "./client/dist/index.html"));
// });
