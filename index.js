const express = require('express');
const path = require('path');


const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/ofertas', (req, res) => {
    res.sendFile(__dirname + "ofertas.html");
});

const userRouter = require('./routers/users_router');
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});