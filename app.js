const express=require('express');
const app=express();
const cookieParser= require("cookie-parser");
const path=require("path");
const expressSession=require('express-session');
const flash=require('connect-flash');
const ownersRouter=require("./routes/ownersRouter");
const usersRouter=require("./routes/usersRouter");
const productsRouter=require("./routes/productsRouter");
const indexRouter = require("./routes/index");
require('dotenv').config();

const db=require("./config/mongoose_connection");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || "mysecretkey", // secure key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // secure: true only in https
}));

app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use("/users", usersRouter);
app.use("/users", indexRouter);
app.use("/owners", ownersRouter);

app.use("/products", productsRouter);


app.listen(3000);

