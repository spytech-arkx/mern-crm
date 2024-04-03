const { readUsers, writeUsers } = require('../services/db/user.service');
const { comparePassword, hashPassword } = require('../helpers/hashing');
const { generateToken } = require('../helpers/jwt');

//rendering pages
exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.renderProfile = (req, res) => {
  res.render('profile');
};

//logic

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await readUsers({ email: email });
    console.log('before', user);
    if (!user) return res.status(400).json({ message: 'User not found' });
    // const checked = await comparePassword(password, user.password);

    if (!checked) return res.status(400).json({ message: 'Incorrect Password' });
    delete user.password;
    delete user._id;
    const token = await generateToken(user);
    res.cookie('tokenAuth', token);
    res.status(302).redirect('/user/profile');
  } catch (err) {}
};
