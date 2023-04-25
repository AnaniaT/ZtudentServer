const express = require('express');
const cors = require('cors');

const dbConnect = require('./db/conector');
const dashboardRouter = require('./routers/dashboard');
const scoreboardRouter = require('./routers/scoreboard');

const app = express();
const port = process.env.PORT || 8080;

// DB connection
dbConnect();

// Server Middlewares
app.use(express.json());
app.use(cors())

// Routers
app.use(dashboardRouter);
app.use(scoreboardRouter);


if (process.env.PORT)
  app.listen(port, () => {
    console.log(`Production server running on port ${port}.`);
  });
else
  app.listen(port, '10.17.250.251', () => {
    console.log(`Development server running on '10.17.250.251' port ${port}.`);
  });