const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json('Hello fucking world!');
});

app.listen(3000, () => console.log('server is up & running!'));