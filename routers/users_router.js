const express = require("express");
const router = express.Router();

const controller = require("../controllers/users_controller");

router.get('/login', controller.find_user)

router.post('/create', controller.create_user)

router.put('/modificar_contra', controller.update_password);

router.delete('/eliminar', controller.delete_user);


module.exports = router;