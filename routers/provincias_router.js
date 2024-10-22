const express = require("express");
const router = express.Router();

const controller = require("../controllers/provincias_controller");

router.get('/', controller.all_provincias)

router.post('/create', controller.create_provincias)

router.put('/modificar', controller.update_provincia);

router.delete('/eliminar', controller.delete_provincia);


module.exports = router;