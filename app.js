require('dotenv').config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkAuthenticationCookie } = require('./middlewares/checkAuthentication');
const staticRoute = require('./routes/staticRoutes');
const blogRoute = require('./routes/blogRoutes');

const app = express();

mongoose.connect(process.env.MONGODB_URL)
        .then(()=>console.log('MongoDB Connected Successfully'))
        .catch((error)=>console.log("Error in connecting MongoDB", error));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.resolve('./images')));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(checkAuthenticationCookie);

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

app.use('/', staticRoute);
app.use('/blog', blogRoute);

const PORT = process.env.PORT || 8003;
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
});