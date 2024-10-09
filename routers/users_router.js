const express = require("express");
const router = express.Router();

const controller = require("../controllers/users_controller");

router.get('/login', controller.find_user)

module.exports = router;