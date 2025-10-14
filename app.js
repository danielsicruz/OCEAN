const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
require("dotenv").config();
routes = require("./src/routes/routes");
require('./src/models/initialize');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
    origin: 'http://localhost:8080', // ou '*' para liberar tudo (não recomendado em produção)
    credentials: true, // necessário para enviar cookies/autenticação
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => {
    res.send('Hello, this is a API for digital archeology library!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});