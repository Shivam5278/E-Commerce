const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');


//Register a User
exports.registerUser = catchAsyncErrors( async(req, res, next) => {
    
    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: 'saample',
            url: 'sample.co'
        }
    });

    sendToken(user, 201, res);
});


//Login User
exports.loginUser = catchAsyncErrors (async (req, res, next) => {

    const {email, password} = req.body;

    //Checking if both recieved
    if(!email  || !password){
        return next(new ErrorHandler('Please enter Email & password', 400));
    };

    const user =  await User.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    };
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    };

    sendToken(user, 200, res);
});


//Logout User
exports.logout = catchAsyncErrors (async(req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'Logged Out',
    })
});