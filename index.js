import express from "express";
import morgan from "morgan";
import cors from "cors";
import color from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import subscriptionRoute from "./routes/subscriptionRoute.js";
import contactRoute from "./routes/contactRoute.js";
import blogRoute from "./routes/blogRoute.js";
import path from "path";
import { fileURLToPath } from "url";

// Dotenv Config
dotenv.config();

// DB Config
connectDB();

// Initailization
const app = express();

// Esmodules Fixed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

// APIs
app.use("/api/v1/subscription", subscriptionRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/blog", blogRoute);

// Rest API
// app.use("/", (req, res) => {
//   res.send(`<h1>App is ready </h1>`);
// });

// Rest API
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// PORT
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}.`.bgMagenta.white);
});
