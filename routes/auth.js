const express = require("express");
const router = express.Router();

const {createUser, LoginUser} = require('../controllers/authController');

router.post("/sign", createUser)

router.post("/login", LoginUser)

module.exports = router;