//Configuration express
const express = require("express");
const app = express();
app.use(express.json());

//Cors
const corsOptions = {
    origin: "http://localhost:3000"
}

const cors = require("cors");

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);

//Variables globales de .env
require("dotenv").config({path: "./config/.env"});

//Import base de donnée
require("./config/db");
const mongoDBstore = new MongoDBStore({
    uri: process.env.URL,
    collection: "mySessions"
});

//Session
app.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: mongoDBstore
}));

//BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Routes
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: http://localhost:${process.env.PORT}`);
});

module.exports = app;
