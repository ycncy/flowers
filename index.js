const express = require("express");
const app = express();

require("./config/db");

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require("cors");
app.use(cors());

require("dotenv").config({path: "./config/.env"});

app.use(express.json());

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: http://localhost:${process.env.PORT}`);
});