const express = require('express');
const cors = require('cors');

const dbConnect = require('./db/conector');
const dashboardRouter = require('./routers/dashboard');
const scoreboardRouter = require('./routers/scoreboard');

const app = express();
const port = 8080;

// DB connection
dbConnect();

// Server Middlewares
app.use(express.json());
app.use(cors())

// Routers
app.use(dashboardRouter);
app.use(scoreboardRouter);


app.listen(port, '10.17.250.251', () => {
  console.log(`Server running on port ${port}.`);
});