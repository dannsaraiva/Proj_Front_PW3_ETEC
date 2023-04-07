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

//Após cadastrar.


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

//Editar.
malit.get('/listarMedicamento/:id_medicamento', (req, res) => {

    let { id_medicamento } = req.params;

    urlListarMedicamentoPK = `http://localhost:3333/listarMedicamentoPK/${id_medicamento}`;

    axios.get(urlListarMedicamentoPK)
        .then((response) => {
            let medicamento = response.data;

            res.render('medicamento/editarMedicamento.ejs', { medicamento });
        });
});

malit.post('/editarMedicamento', (req, res) => {

    let urlEditar = 'http://localhost:3333/atualizarMedicamento';

    axios.put(urlEditar, req.body)
        .then(() => {
            res.redirect('/listarMedicamento');
        });
});

// Excluir.
malit.get('/excluirMedicamento/:id_medicamento', (req, res) => {

    let { id_medicamento } = req.params;

    let urlExcluirMedicamento = `http://localhost:3333/excluirMedicamento/${id_medicamento}`;

    axios.delete(urlExcluirMedicamento)
        .then(() => {
            res.redirect('/listarMedicamento');

        }).catch(() => {

        });
});






//Servidor rodando.
const PORT = 4200;
malit.listen(PORT, console.log("Servidor front - http://localhost:4200"));



