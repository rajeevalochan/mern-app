const express = require("express");
const colors = require("colors");
const { errorHandlerMiddleware } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv").config();
const PORT = process.env.NODE_PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log("====================================");
  console.log(`Node Server running on http://localhost:${PORT}`);
  console.log("====================================");
});
