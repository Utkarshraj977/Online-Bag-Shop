const userModel = require('../models/user_model');
const Joi=require('joi');
const bcrypt=require('bcrypt');
const {generateToken} = require('../utils/generateToken');


module.exports.registerUser= async (req, res) => {
    const userSchema = Joi.object({
        fullname: Joi.string().min(3).required().messages({
            'string.empty': "Fullname is required",
            'string.min': "Fullname must be at least 3 characters"
        }),
        email: Joi.string().email().required().messages({
            'string.empty': "Email is required",
            'string.email': "Invalid email format"
        }),
        password: Joi.string().min(6).required().messages({
            'string.empty': "Password is required",
            'string.min': "Password must be at least 6 characters"
        })
    });

    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).send("Validation Error: " + error.details[0].message);
    }

    try {
        const { fullname, email, password } = value;
        let user=await userModel.findOne({email:email});
        if(user) return res.status(401).send("Allready have account.please Login");


        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message);
                else {
                    let user=await userModel.create({ 
                         fullname,
                         email,
                         password:hash
                    });
                    let token=generateToken(user);
                    res.cookie("token",token);
                    res.send("user create succesfully");

                }
            })
        })
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

module.exports.loginUser=async function (req,res){
    let {email,password}=req.body;

    let user=await userModel.findOne({email:email});
    if(!user) return res.send("Email or password wrongs");

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token=generateToken(user);
            res.cookie("token",token);
            res.send("Login succesfully");
        }else{
            return res.status(400).send("Email or password wrong");
        }
        
    }

    )
}


