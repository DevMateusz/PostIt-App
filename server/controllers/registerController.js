const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createNewUser = async (req, res) => {
  try{
    const {name, email, password, passwordConfirmation, colorPattern} = req.body;
    const lowerCaseEmail = email.toLowerCase(); 
    if(!(name && lowerCaseEmail && password && passwordConfirmation && colorPattern)) {
      return res.status(400).json({"message": "All input is required"});
    }

    if(password !== passwordConfirmation){
      return res.status(422).json({"message": "Password are not the same"});
    }

    const userExist = await User.findOne({ email: lowerCaseEmail });

    if(userExist) {
      return res.status(422).json({"message": "User already exists"});
    }

    encryptedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email: lowerCaseEmail,
      password: encryptedPassword,
      colorPattern,
    });
    
    const token = jwt.sign({id: newUser._id, email: lowerCaseEmail}, process.env.TOKEN_KEY, {expiresIn: '2h'});

    res.status(201).json({ _id: newUser._id, name: newUser.name, email: newUser.email, token: token });
  } catch(err) {
    console.error(err);
  }
}

module.exports = { createNewUser };
