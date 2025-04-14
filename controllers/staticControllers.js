const User = require('../models/user');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const getHomepage = async(req, res)=>{
    const allBlogs = await Blog.find({}).populate('author');
    return res.render('homepage', {user: req.user, blogs: allBlogs, error: null});
}

const getSignUpPage = (req, res)=>{
    return res.render('signUpPage', {user: req.user, error: null});
}

const createUser = async(req, res)=>{
    try{
        const {fullName, email, password} = req.body;

        if (!fullName || !email || !password){
            return res.render('signUpPage', {error: 'Enter all details'});
        }

        const existsUser = await User.findOne({email});
        if (existsUser){
            return res.render('signUpPage', {error: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        });
    
        const token = jwt.sign({userId: newUser._id, email: newUser.email}, process.env.JWT_SECRET);
        res.cookie('token', token);
        return res.redirect('/');

    }catch(error){
        res.render('signUpPage', {error: "Error while signing up the user"});
    }
}

const getLoginPage = (req, res)=>{
    return res.render('loginPage', {user: req.user, error: null});
}

const loginUser = async(req,res)=>{
    try{
        const {email, password} = req.body;

        if (!email || !password){
            return res.render('loginPage', {error: "Enter all details"});
        }

        const user = await User.findOne({email});

        if (!email){
            return res.render('loginPage', {error: 'Invalid User Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch){
            const token = jwt.sign({userId: user._id, email: email}, process.env.JWT_SECRET);
            res.cookie('token', token);
            return res.redirect('/');
        }else{
            return res.render('loginPage', {error: "Invalid User Credentials"});
        }

    }catch(error){
        return res.render('loginPage', {error: "Error while logging in the user"});
    }
}

const logoutUser = (req, res)=>{
    res.clearCookie('token');
    return res.redirect('/');
}

module.exports = {
    getHomepage,
    getSignUpPage,
    createUser,
    getLoginPage,
    loginUser,
    logoutUser,
}

