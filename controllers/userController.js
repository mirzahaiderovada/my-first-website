const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  try {
    const existingUser = await User.findOne({
      where: { user_email: user_email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(user_password, 10);

    const user = await User.create({
      user_name: user_name,
      user_email: user_email,
      user_password: hashedPassword,
    });

    const token = jwt.sign(
      { user_email: user.user_email, id: user.id },
      SECRET_KEY
    );
    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    const user = await User.findOne({ where: { user_email: user_email } });
    if (user) {
      const matchPassword = await bcrypt.compare(
        user_password,
        user.user_password
      );
      if (matchPassword) {
        const token = jwt.sign(
          { user_email: user.user_email, id: user.id },
          SECRET_KEY
        );
        res.status(200).json({ user, token });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  signup,
  login,
};
