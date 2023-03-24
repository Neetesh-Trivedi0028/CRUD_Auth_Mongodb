const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
console.log(process.env.JWT_SECRET)
const User = require('../model/usermodel');
exports.signpup = async (req, res) => {
    //console.log(req)
    try {
        let newUser = await User.create(req.body);
        const id = newUser.id
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        //remove password from output
        newUser.password = undefined;
        console.log("token", token);
        res.status(201).json({
            status: "success",
            token,
            data: { newUser }
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data: error.message
        });
    }
};
exports.login = async (req, res) => {
    try {
        //console.log(req.body.email,"email@@")
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            res.status(401).json("please provide an email and password");
        };
        const user = await User.findOne({ email }).select('+password');
        if (!user || !await user.correctPassword(password, user.password)) {
            res.status(401).json("please provide an email and password");
        };
        const id = user.id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({
            status: "success",
            token,
            data: user
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            data: error.message
        });
    }
};
exports.protect = async (req, res,next) => { 
    console.log(req.headers.authorization)
    let token;
    // //1 getting token and check it's there
    if(req.headers.authorization){
        token = req.headers.authorization.split(' ')[1];
    };
    if(!token){
       return res.status(401).json("You are not logged in!");
    };
    // //2 verification token 
    let c = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWQ2OTYwYjUyNDk2M2NiYzEzOWVhZiIsImlhdCI6MTY3OTY1MDA2MywiZXhwIjoxNjg3NDI2MDYzfQ.45-IyHUPhaPqVAewsrckTTAH1_JvNz3154dDDPccbaA';
    console.log("conditionTEst####",c===token)
     const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    // //3 check if user is still exist
   const currentuser = await User.findById(decode.id);
    if(!currentuser){
       return res.status(401).json("the user belong to this token is no longer exist!!");
    };
    // // grant access to proceed
    req.user = currentuser;
    next();
};