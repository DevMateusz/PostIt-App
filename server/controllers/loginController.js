const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUserToAccount = async(req, res) => {
  try {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    
    if(!(lowerCaseEmail && password)) {
      return res.status(200).json({"message": "All input is required"});
    }
    
    const user = await User.findOne({ email: lowerCaseEmail }, { _id: 1, name: 1, email: 1, password: 1});

    if(!user) {
      return res.status(422).json({"message": "User does not exist"});
    } else if(bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({id: user._id, email: lowerCaseEmail}, process.env.TOKEN_KEY, {expiresIn: '2h'});

      return res.status(200).json({ _id: user._id, name: user.name, email: user.email, token: token });
    };
    return res.status(422).json({"message": "Invalid credentials"});
  } catch(err) {
    return console.error(err);
  }
}

module.exports = { loginUserToAccount };

