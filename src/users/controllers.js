const User = require("./model");

const signupUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    if (user) res.status(201).json({ message: "user added", user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({});
    res.status(200).json({ message: "All users: ", allUsers });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {
    user = req.user;
    res.status(201).json({ message: "login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = {
  signupUser,
  getAllUsers,
  login,
};
