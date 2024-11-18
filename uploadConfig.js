const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "user_ProfilePicture");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const storage_categorias = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "category_photos");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const storage_imagenes_emprendimiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "emprendimiento_photos");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const storage_imagenes_publicaciones = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "publicaciones_photos");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});


const upload = multer({ storage });
const upload_cat_images = multer({ storage: storage_categorias });
const upload_emprendi_images = multer({ storage: storage_imagenes_emprendimiento });
const upload_publi_images = multer({ storage: storage_imagenes_publicaciones });


module.exports = {upload, upload_cat_images, upload_emprendi_images, upload_publi_images};
