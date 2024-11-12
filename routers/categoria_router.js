const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = require('../uploadConfig'); 


const controller = require("../controllers/categorias_controller");

router.get('/', controller.all_cats)

router.post('/create', upload.upload_cat_images.single("imagen") ,controller.create_cat)

router.put('/modificar_categoria', upload.upload_cat_images.single("imagen"), controller.update_cat);

router.delete('/eliminar', controller.delete_cat);


module.exports = router;