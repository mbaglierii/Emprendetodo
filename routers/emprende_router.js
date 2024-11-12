const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = require('../uploadConfig'); 

const controller = require("../controllers/emprende_controller");

router.get('/', controller.all_emprendimientos)

router.get('/encontrar', controller.find_emprendimientos)

router.post('/create', upload.upload_emprendi_images.single("imagen"),controller.create_emprendimiento)

router.put('/modificar_emprendimiento', upload.upload_emprendi_images.single("imagen"), controller.update_emprendemiento);

router.delete('/eliminar', controller.delete_emprendimiento);


module.exports = router;