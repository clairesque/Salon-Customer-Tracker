const express = require('express');
const app = express();
var path = require("path");

// display index.html when heroku app first reloads
var staticPath = path.resolve(__dirname, "static");
app.use(express.static(staticPath));

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})

const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb+srv://mongoDB:mongoDB@cluster0.kotmn.mongodb.net', (err, client) => {
    db = client.db('Saloon_Tracker')
})

// display a msg 
app.get('/', (req, res, next) => {
  //  res.send('Select a collection, e.g., /collection/messages'),
    console.log("URL Logger = " + req.url)
})

// get the collection name
app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})

app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
    console.log("URL Logger = " + req.url)
})

//add an object

app.post('/collection/:collectionName', (req, res, next) => {
    req.collection.insert(req.body, (e, results) => {
        if (e) return next(e)
        res.send(results.ops)
    })
    console.log("URL Logger = " + req.url)
})

const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => {
        if (e) return next(e)
        res.send(result)
    })
})


//update
app.put('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.update(
        { _id: new ObjectID(req.params.id) },
        { $set: req.body },
        { safe: true, multi: false }, (e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ? { msg: 'success' } : { msg: 'error' })
        })
})
//delete
app.delete('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.deleteOne(
        {
            _id: ObjectID(req.params.id)
        },
        (e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ?
                { msg: 'success' } : { msg: 'error' })
        })
})


//Middleware - Logger

app.use((req, res, next) => {
    console.log("URL Logger = " + req.url),
        next()
})


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Express.js server running at localhost:3001')
})