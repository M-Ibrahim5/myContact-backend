const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("../models/userModel")

//@desc Register user
//@route Post api/user/register
//@access public
const registerUser = asyncHandler(async(req,res) => {
    const {username, email, password} = req.body;
    //check if empty
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("Email already taken");
    }
    
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: " + hashedPassword);
    
    const user = await User.create({
        username, email, password:hashedPassword,
    })
    console.log("Created user: " + user);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("User data is not valid. please check again")
    }
    res.json({message:"register user"})
});

//@desc login user
//@route Post api/user/register
//@access public
const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email});
    //compare password to hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accesTokenm = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"2m"}
    ) 
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }

    // res.json({message:"login user"})
});

//@desc current user info
//@route Post api/user/register
//@access private only
const currentUser = asyncHandler(async(req,res) => {
    res.json({message:"current user"})
});


module.exports = {registerUser, loginUser, currentUser};

