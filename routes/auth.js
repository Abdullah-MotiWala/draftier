const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenMiddle = require("../middleWare/fetchUser");

const router = express.Router();

const JWT_SECRT = 'processenvSECRET_KEY';

//ROUTE 1: creating user using /api/auth/signup
router.post(
  "/signup",
  [
    //validation
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password must be 6 letter long").isLength({ min: 6 })
  ],
  // showing error if error found
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //returning bad request if email already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already Exist" });
      }

      //hashing password
      const salt = bcrypt.genSaltSync(5);
      const hashedPass = bcrypt.hashSync(req.body.password, salt);

      //creating user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
      });

      //sending gwtToken using user.id
      const data = {
        user: {
          id: user.id
        }
      };
      const authToken = jwt.sign(data, JWT_SECRT);
      res.json({ authToken });
    } catch (err) {
      console.log(err);
      res.send({ error: "Internal Server Error" });
    }
  }
);

//ROUTE 2: sign in user using /api/auth/login
router.post(
  "/login",
  //validation
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password can not be blank").exists()
  ],
  //showing errors
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //checking if user is in db
    const { email, password } = req.body;
    try {
      //wrong email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Credentials not found" });
      }
      //wrong password
      const comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        return res.status(400).json({ error: "Credentials not found" });
      }
      //sending gwtToken using user.id
      const data = {
        user: {
          id: user.id
        }
      };
      const authToken = jwt.sign(data, JWT_SECRT);
      res.json({ authToken });
    } catch (err) {
      res.send({ error: "Internal Server Error" });
    }
  }
);



// ROUTE 3: sending data of user using /api/auth/userDetails login require
router.post("/userDetails", tokenMiddle, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.send({ error: "Internal Server Error" });
  }
});

module.exports = router;
