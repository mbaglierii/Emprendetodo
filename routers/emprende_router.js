const express = require("express");
const router = express.Router();

const controller = require("../controllers/emprende_controller");

router.get('/', controller.all_emprendimientos)

router.get('/encontrar', controller.find_emprendimientos)

router.post('/create', controller.create_emprendimiento)

router.put('/modificar_emprendimiento', controller.update_emprendemiento);

router.delete('/eliminar', controller.delete_emprendimiento);


module.exports = router;