const express = require("express");
const router = express.Router();

const controller = require("../controllers/publicaciones_controller");

router.get('/find', controller.find_publis)

router.get('/', controller.all_publis)

router.post('/create', controller.create_public)

router.put('/modificar', controller.update_public);

router.delete('/eliminar', controller.delete_publi);


module.exports = router;