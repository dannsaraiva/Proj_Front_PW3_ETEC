//Importação das bibliotecas.
const { response } = require('express');
const express = require('express');
const axios = require('axios').default;

//Declaração e atribuição no aplicativo.
const malit = express();

malit.use(express.json());
malit.use(express.urlencoded({ extended: true }));

//Configuração do JSEngine.
malit.use(express.static('public'));
malit.set('view engine', 'ejs');

//Início da construção das rotas.
malit.get('/', (req, res) => {
    res.render('index');
});

//Cadastro.
malit.get('/medicamento', (req, res) => {
    res.render('medicamento/cadastroMedicamento');
});

//Listagem.
malit.get('/listarMedicamento', (req, res) => {

    //Rota para bater no back.
    const urlListarMedicamento = 'http://localhost:3333/listarMedicamento'

    axios.get(urlListarMedicamento)
        .then((response) => {
            console.log(response.data);
            let medicamento = response.data;
            res.render('medicamento/listarMedicamento', { medicamento });
        });
});






//Servidor rodando.
const PORT = 4200;
malit.listen(PORT, console.log("Servidor front - http://localhost:4200"));



