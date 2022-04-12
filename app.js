const express = require('express');

const app = express();
const PORT = 9000;

app.listen(PORT,() => { console.log(`app is running...`)});

//routes
app.get('/', (req, res) => {
    res.send('<h1>Hello, welcome to the NodeJS + MongoDB App!</h1>')
});

app.get('/books', (req, res) => {
    res.json({message: "Welcome to the books API"});
});