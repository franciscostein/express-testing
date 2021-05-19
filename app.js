const express = require('express');
const todoRoutes = require('./routes/todo.routes');
const mongodb = require('./mongodb/mongodb.connect');

const app = express();

mongodb.connect();

app.use(express.json());

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    res.json('Hello fucking world!');
});

// app.listen(3000, () => console.log('server is up & running!'));

module.exports = app;