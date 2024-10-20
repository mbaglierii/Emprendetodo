const express = require("express");
const router = express.Router();

const controller = require("../controllers/categorias_controllers");

router.get('/', controller.all_cats)

router.post('/create', controller.create_cat)

router.put('/modificar_categoria', controller.update_cat);

router.delete('/eliminar', controller.delete_cat);


module.exports = router;