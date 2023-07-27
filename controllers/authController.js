const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User'); // Assuming you have the User model defined

// Route to handle user sign-up
const signup = async (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return next(
        createError({
          message: 'Name, Email & password are required',
          statusCode: 400,
        }),
      );
    }
  
    try {
      const existUser = await User.findOne({ email: req.body.email });
      if (existUser) {
        return res.status(400).send({ message: 'You are already an existing user' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
  
      await newUser.save(); // Use await to properly handle the save operation
  
      res.status(201).send({ message: 'User has been added successfully.' });
    } catch (error) {
      res.status(500).send({
        message: 'Internal Server Error',
      });
    }
  };
  

// Route to handle user sign-in
const signin = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(
      createError({
        message: 'Email and password are required',
        statusCode: 400,
      }),
    );
  }

  try {
    const existUser = await User.findOne({ email: req.body.email }).select('name email password');
    if (!existUser) {
      return res.status(400).send({ message: 'You are not a registered user. Please sign up to register' });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, existUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: 'Incorrect Password' });
    }

    const payload = {
      id: existUser._id,
      name: existUser.name,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.send(token);
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  signup,
  signin,
};
