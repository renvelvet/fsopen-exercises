const jwt = require('jsonwebtoken');
const bcyrpt = require('bcrypt');
const User = require('../models/user');
const loginRouter = require('express').Router();

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcyrpt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.secret);

  response.status(200).json({ token, user });
});

module.exports = loginRouter;
