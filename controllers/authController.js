const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

//sign up -Auth
const createUser = async (req,res) => {
  const { userName, pass, email, category } = req.body;

  try {
    let userFind = await userModel.findOne({ email: email });
    if (userFind) {
      return res.status(400).json({msg: "Account already exist from this email! Please LogIn"});
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pass, salt, async (err, hash) => {
          if (err) return res.status(400).json({msg: "error while creating account"});
          else {
            let newUser = await userModel.create({
              userName,
              pass: hash,
              email,
              category
            });
            let token = generateToken(newUser);
            res.status(200).json({msg: "User created sucessfully", token: token});
          }
        });
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Login -Auth
const LoginUser = async(req,res)=>{
    let {email, password} = req.body;

   let userFind = await userModel.findOne({ email: email });
if (!userFind) {
  return res.status(400).json({ msg: "Email or Password is incorrect!" });
}

// Direct comparison of passwords (without hashing)
const isMatch = await bcrypt.compare(password, userFind.pass);
if (isMatch) {
  let token = generateToken(userFind);
  return res.status(200).json({ msg: "Successfully Logged In!", token: token });
} else {
  return res.status(400).json({ msg: "Email or Password is incorrect!" });
}
  }

module.exports = {
  createUser,
  LoginUser
};
