const express = require('express');
const path = require('path');
const upload = require('./uploadConfig');
const auth = require('./middleware/auth.middleware')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());

process.env.S_KEY = "63dbcdd33f85eef88dec12f4ffc3b776cd693976333e86076e609ca7e4793a8f7ad13c461b99eb11b25403e810d1ab904759e41fec7079c42f3286df190fa2f1de6726d45cfc87757f91f4bb3e22f020629150de1098101cbfebdcb582903450e22fd51aafd5d68b0c02d751bf56431738911d871c667c823ef754edfb2fb3f509afbcebffff0fd85971019cc0685f32821d0fe9a315fe83e55e377f6240c74561c8762a8a10eb12559deafc508a9ac225a7498550e030592f1f8e85db45988f0427f8909f7f489aeef47049cc6e5ce43faccbfefea6ea63253a6121318134f2db6e162084d0953890cfda69e797c485a5b05bb1bd12784b22692495cf8596b6"
process.env.S_KEY_ADMIN =  '9jXdUJ8VEgLoEyF0y4Hxg16hgP0OPyB'

app.use('/user_ProfilePicture', express.static(path.join(__dirname, '/user_ProfilePicture')));

app.use('/category_photos', express.static(path.join(__dirname, '/category_photos')));

app.use('/emprendimiento_photos', express.static(path.join(__dirname, '/emprendimiento_photos')));

app.use('/publicaciones_photos', express.static(path.join(__dirname, '/publicaciones_photos')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/ofertas', auth.verify_user,(req, res) => {
    res.sendFile(__dirname + "/private/ofertas.html");
});

app.get('/crearpublicaciones', (req, res) => {
    res.sendFile(__dirname + "/private/crear_publicaciones.html");
});

app.get('/crearemprendimiento', auth.verify_user,(req, res) => {
    res.sendFile(__dirname + "/private/crear_emprendimiento.html");
});

app.get('/admins', auth.verify_admin,(req, res) => {
    res.sendFile(__dirname + "/private/admins.html");
});

const userRouter = require('./routers/users_router');
app.use('/users', userRouter);

const empreRouter = require('./routers/emprende_router');
app.use('/emprendimientos', empreRouter);

const catRouter = require('./routers/categoria_router');
app.use('/categorias', catRouter);

const publiRouter = require('./routers/publicaciones_router');
app.use('/publicaciones', publiRouter);

const localidadesRouter = require('./routers/localidades_router');
app.use('/localidades', localidadesRouter);

const provinciaRouter = require('./routers/provincias_router');
app.use('/provincias', provinciaRouter);


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});