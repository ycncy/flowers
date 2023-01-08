//Configuration express
const express = require("express");
const app = express();
app.use(express.json());

//Import base de donnée
require("./config/db");

//Fonctions du middleware de connexion
const {
    is_authenticated,
    restrain_access
} = require('./middleware/auth.middleware');
app.get('*', is_authenticated);
app.get('/jwtid', restrain_access, (req, res) => {
    res.status(201).send(res.locals.user._id);
})

//BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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