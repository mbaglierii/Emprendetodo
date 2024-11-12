const express = require("express");
const multer = require('multer')
const router = express.Router();

const controller = require("../controllers/users_controller");
const upload = require('../uploadConfig'); 


router.get('/', controller.all_users)

router.post('/login', controller.find_user)

router.post('/create', upload.upload.single('imagen'), controller.create_user)

router.put('/modificar_usuario', controller.update_user);

router.delete('/eliminar', controller.delete_user);


module.exports = router;