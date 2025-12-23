const express = require("express");
const connectDatabase = require("./src/config/db");
const { apiRouter } = require("./src/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT;

app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

connectDatabase();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
