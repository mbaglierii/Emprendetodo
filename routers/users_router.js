const express = require("express");
const multer = require('multer')
const router = express.Router();

const controller = require("../controllers/users_controller");
const upload = require('../uploadConfig'); 


router.get('/', controller.all_users)

router.get('/login', controller.find_user)

router.post('/create', upload.single('imagen'), controller.create_user)

router.put('/modificar_contra', controller.update_password);

router.delete('/eliminar', controller.delete_user);


module.exports = router;