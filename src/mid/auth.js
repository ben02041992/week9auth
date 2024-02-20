const bcrypt = require("bcrypt");

const User = require("../users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    const hashedPass = (req.body.password = await bcrypt.hash(
      req.body.password,
      saltRounds
    ));
    req.body.password = hashedPass;
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    const password = req.body.password;
    const user = await User.findOne({ where: { username: req.body.username } });

    const match = await bcrypt.compare(password, user.dataValues.password);

    if (!match) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error });
  }
};
module.exports = { hashPass, comparePass };
