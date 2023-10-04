const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 8000; // Altere a porta, se necessário
const dbUrl = "mongodb://127.0.0.1:27017/cadastro"; // URL do seu banco de dados

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 20000 });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Erro de conexão ao MongoDB:"));
db.once("open", () => {
    console.log("Conectado ao MongoDB");
});

// Crie um modelo Mongoose para a coleção "usuarios"
const Usuario = mongoose.model("Usuario", {
    nome: String,
    email: String,
    celular: String,
    endereco: String,
    complemento: String,
    numero: String,
    bairro: String,
    cidade: String,
    uf: String,
    cep: String
});

app.use(bodyParser.json());

// Rota para processar o cadastro do usuário
app.post("/cadastrar-usuario", (req, res) => {
    const userData = req.body;
    const novoUsuario = new Usuario(userData);

    novoUsuario.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Erro ao cadastrar usuário.");
        } else {
            res.status(200).send("Usuário cadastrado com sucesso.");
        }
    });
});

app.use(express.static(path.join(__dirname, "public")))

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
