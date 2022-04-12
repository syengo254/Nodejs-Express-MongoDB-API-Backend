const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

const app = express();
app.use(express.json());

//connect to database
let db;
connectToDb((error) => {
    if(!error){
        app.listen(PORT,() => { console.log(`app is running...`)});
        db = getDb();
    }
});

const PORT = 9000;

//routes
app.get('/', (req, res) => {
    res.send('<h1>Hello, welcome to the NodeJS + MongoDB App!</h1>')
});

app.get('/books', (req, res) => {
    //get current page from request param for pagination
    const page = req.query.page || req.query.p || 0;
    const ITEMS_PER_PAGE = 3;

    const books = [];

    db.collection('books')
        .find()
        .skip( ITEMS_PER_PAGE * page)
        .limit(ITEMS_PER_PAGE)
        .sort( {author: 1})
        .forEach( book => books.push(book))
        .then ( () => {
            res.status(200).json(books);
        })
        .catch( e => {
            res.status(500).json({ error: "Could not fetch the books!", message: e.message});
        })
});

app.get('/books/:id', async (req, res) =>{
    if(ObjectId.isValid(req.params.id)){
        try {
            let book = await db.collection('books').findOne({_id: ObjectId(req.params.id)});
    
            res.status(200).json(book == null ? {} : book);
        } catch (e) {
            res.status(500).json({ error: "Could not fetch the book!", message: e.message});
        }
    }
    else{
        res.status(501).json({error:"object id is not valid"});
    }
});

app.post('/books', (req, res) => {
    const book = req.body;

    if(!book) return res.send('problemo!');

    db.collection('books').insertOne(book)
        .then( result => {
            res.status(201).json(result);
        })
        .catch( e => {
            res.status(500).json({ error: "Could not add book!", message: e.message});
        });
});

app.delete('/books/:id', async (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        const result = await db.collection('books').deleteOne({ _id: ObjectId(req.params.id)});

        res.status(200).json(result);
    }
    else{
        res.status(401).json({message: "Invalid id specified!"});
    }
});

app.put('/books/:id', async (req, res) => {
    const updates = req.body;

    if(ObjectId.isValid(req.params.id)){
        try {
            const result = await db.collection('books').updateOne(
                { _id: ObjectId(req.params.id)},
                {
                    $set: updates,
                }
            );
    
            res.status(200).json(result);
        } catch (error) {
            res.status(501).json({message: error.message, error: "could not delete book"});
        }
    }
    else{
        res.status(401).json({message: "Invalid id specified!"});
    }
});