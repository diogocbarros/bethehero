const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

// Cors -> Proteção de acesso
app.use(cors());
app.use(express.json());
app.use(routes);
/**
 * Query Params: Parametros nomeados enviados na rota apos ? (filtros e paginacao)
 * Route Params: Parametros utilizados para identificar recursos
 * Request body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

app.listen(3333,()=> console.log('servidor on'));