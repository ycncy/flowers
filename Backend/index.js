//Configuration express
const express = require("express");
const app = express();
app.use(express.json());

//Import base de donnée
require("./config/db")

//BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Cors
const cors = require("cors");
app.use(cors());

//Variables globales de .env
require("dotenv").config({path: "./config/.env"});

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