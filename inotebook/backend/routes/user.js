const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'this$is$the$sec$string';

let success = false;

// Route1 Signup the User
router.post('/signup',[
  // Initializing Validators
  body('name', "Enter Name correctly").isLength({min: 3}),
  body('email', "Use correct Email").isEmail(),
  body('password', "Minimum Length is 5").isLength({min: 5})
], async (req, res)=>{
  // If error occured this this shows error message
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  };
  try {
    // Checking weather the email already exist or not 
    let user = await User.findOne({email: req.body.email});
    if (user){
      return res.status(400).json({success, error: "Sorry this email already exist"});
    }
    
    // Creating Hash of the password 
    let salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);

    // Creating new user
    user = User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    const data_Signup = {
      user: {
        id: user.id
      }
    };
    const authToken_Signup = jwt.sign(data_Signup, JWT_SECRET);
    res.send({success: true, authToken_Signup});


  } catch (err) {
    console.log(err.message);
    res.send(500).json({"err": "Some Error Occured"});
  };
});


// Route2 Login the user 
router.post('/login', [
  // Initializing Validators
  body('email', 'Enter correct email').isEmail(),
  body('password', 'Enter pasword').exists()
], async (req, res)=>{
  // If error occured this this shows error message
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  try {
    const { email, password } = req.body;

    // Checking weather user exist or not 
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).send({success: false, err: "User not exist"});
    };

    // Checking password of the existing user 
    let pass = await bcrypt.compare(password, user.password);
    if(!pass){
      return res.status(400).send({success: false, err: "Incorrect Password"});
    };

    let data_Login = {
      user: {
        id: user.id
      }
    };
    let authToken_Login = jwt.sign(data_Login, JWT_SECRET);
    res.send({success: true, authToken_Login});

  } catch (error) {
    res.status(400).send({success: false, err: "Some internal error occured"});
  };

});


// Route3 Fetching the details of the logid user
router.post('/getuser',fetchuser, async (req, res)=>{
  try {
    let userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(400).send({err: "Some error occured"});
  }
});

module.exports = router;