const express = require('express')
const User = require('../models/User')
const argon2 = require('argon2')

const router = express.Router(); // getting a router  object to create Authentication routes.



router.post('/register', async (req, res) => {
  try{
    console.log(`Body: ${req.body.email}`)//testing if we are getting correct info in request object

    const {email, password} = req.body; // destructuring body object to get email and password

    const hashPassword = await argon2.hash(password);

    const newUser = new User({email: email, password: hashPassword}); //create a newUser using User model object
    await newUser.save(); //saving newUser to DB
    res.status(201).json({message: "User Registered successfully"}); //sending response code 201 with messages



  }catch(err){
    res.status(500).json({error:"Internal server error"})
    console.log(`error in auth register route: ${err} `)
  }
})

module.exports = router;