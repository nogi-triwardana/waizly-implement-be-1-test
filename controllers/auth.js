const User = require('../models/User');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

require('dotenv').config();

const Register = async (req, res) => {
  try {
    let bcryptPass = await bcrypt.hash(req.body.password, 8);

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcryptPass,
    })
      .then(user => {
        res.send({ message: 'User was registered successfully!' });
      })

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const Login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({
      where: {
        email
      }
    });

    if(!user) throw { message: 'Invalid email/password' };
    let valid = bcrypt.compare(password, user.password);
    if(!valid) throw { message: 'Invalid email/password' }
    let access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ access_token });
  } catch (error) {
    next(error);
  }
};

module.exports = { Register, Login };