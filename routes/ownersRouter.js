const express = require("express");
const router = express.Router();

const ownerModel = require('../models/owner_model');

if (process.env.NODE_ENV === "development") {
    router.post("/create",async function (req, res) {
        let owners=await ownerModel.find();
        if(owners.length>0){
            return res.send(503).send("you dont have permissions to create owner.");
        }
        let {fullname,email,password}=req.body;
        let createdOwner=await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.send(createdOwner);
    });
}

router.get("/admin", (req, res) => {
    let success=req.flash("success");
    res.render("createProduct",{success});
});


module.exports = router;


