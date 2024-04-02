const express = require('express');
const mongoose = require('mongoose');
const { urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./src/utils/logger');
require('dotenv').config();

const companyRouter = require('./src/routes/company.routes');
const contactRouter = require('./src/routes/contact.routes');
// const dealRouter = require('./src/routes/deal.routes');
// const taskRouter = require('./src/routes/task.routes');
// const userRouter = require('./src/routes/user.routes');

const app = express();
const port = process.env.PORT || 3000; // Use port from environment or default to 3000
app.use(express.json()); // Parse JSON body data
app.use(cookieParser()); // Parse HTTP request cookies.
app.use(urlencoded({ extended: true })); //  Parses urlencoded bodies.
app.use(logger); // A logger for just about everything.

// Database Connection process.env.MONGODB_URI
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB..'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// API Routers
app.use('/api/companies', companyRouter);
app.use('/api/contacts', contactRouter);
// app.use('/api/deals', dealRouter);
// app.use('/api/tasks', taskRouter);
// app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/api`);
});
