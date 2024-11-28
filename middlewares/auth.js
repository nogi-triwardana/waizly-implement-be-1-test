const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;

  if(!token) return res.status(401).send({
    message: 'Unauthorizated'
  });

  try {
    token = token.split(' ')[1];
    if(token === 'null' | !token) return res.status(401).send({
      message: 'Unauthorized'
    });

    let verifyUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyUser) return res.status(401).send('Unauthorized');

    req.user = verifyUser;
    next();
      
  } catch(error) {
    res.status(400).send({ message: 'invalid token' })
  }
};

module.exports = { verifyUserToken };