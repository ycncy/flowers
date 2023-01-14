require("dotenv").config({path: "./config/.env"});
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);


mongoose.connect(process.env.URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log("Connecté à la base de donnée")).catch((err) => console.log("Connexion failed", err));
