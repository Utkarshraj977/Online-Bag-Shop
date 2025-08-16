const express = require("express");
const router = express.Router();
const {IsLoggedIn}=require('../middlewares/IsLoggedIn');
const {logout}= require('../controllers/authController');
const productModel = require('../models/product_model');
const userModel=require('../models/user_model');

// Home route (Landing page)
router.get("/", (req, res) => {
    let error=req.flash("error");
    res.render("home",{error,loggedin:false}); 
});

// Route to display login page
router.get("/login", (req, res) => {
    let error=req.flash("error");
    res.render("login",{error,loggedin:false});
});

// Route to log out
router.get("/logout",IsLoggedIn,function(req,res){
    res.clearCookie("token");
    req.flash("error","User Logout succesfully");
    res.redirect("/users/login");
});

// Route to display signup page
router.get("/signup", (req, res) => {
    let error=req.flash("error");
    res.render("signup",{error,loggedin:false});
});

// Route to display shop page
router.get("/shop",IsLoggedIn,async (req, res) => {
    let products= await productModel.find();
    let success=req.flash("success");
    res.render("shop",{products,success});
});

// Route to display shop page
router.get("/cart",IsLoggedIn,async (req, res) => {
    let user=await userModel
    .findOne({email:req.user.email})
    .populate("cart");
    const discount=(user.cart[0].price*user.cart[0].discount)/100;
    const bill=user.cart[0].price-discount+20;
    //console.log(user.cart[0].bgcolor);
    res.render("cart",{user,bill});
});

//Route for addtocart
router.get("/addtocart/:productid",IsLoggedIn,async (req, res) => {
    let user= await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","product adding in cart");
    res.redirect("/users/shop");
});

module.exports = router;
