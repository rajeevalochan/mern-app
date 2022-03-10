const express = require('express');
const { errorHandlerMiddleware } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const PORT = process.env.NODE_PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log('====================================');
  console.log(`Node Server running on http://localhost:${PORT}`);
  console.log('====================================');
});
