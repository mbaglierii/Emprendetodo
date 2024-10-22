const express = require("express");
const router = express.Router();

const controller = require("../controllers/localidades_controller");

router.get('/', controller.all_localidades)

router.get('/find', controller.find_localidades)

router.post('/create', controller.create_localidad)

router.put('/modificar', controller.update_localidad);

router.delete('/eliminar', controller.delete_localidad);


module.exports = router;