const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./configs/connectDB");
const router = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credential: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api endpoints
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
