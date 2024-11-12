const multer = require("multer");
const path = require("path");

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


const upload = multer({ storage });
const upload_cat_images = multer({ storage: storage_categorias });
const upload_emprendi_images = multer({ storage: storage_imagenes_emprendimiento });


module.exports = {upload, upload_cat_images, upload_emprendi_images};
