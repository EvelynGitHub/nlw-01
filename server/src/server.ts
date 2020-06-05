import express from 'express';
import router from './routes';
import cors from 'cors';
import path from 'path';
import {errors} from 'celebrate';

const app = express();
app.use(cors());
app.use(express.json())
app.use(router);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); 

app.use(errors());

app.listen(3333);


// EXPLICAÇÃO SOBRE ROTAS E SEUS TIPOS.

// Rota: Endereço completo da requisição
// Recurso: Qual entidade estams acessando do sistema

// GET: Buscar um ou mais informações do back-end
// POST: Criar um nova informação no back-end
// PUT: Atualilzar uma atualização existente no back-end
// DELETE: Remover uma informação do back-end

// POST: http:/localhost:3333/users = Criar um usuário
// GET:  http:/localhost:3333/users = Listar usuários
// GET:  http:/localhost:3333/users/5 = Buscar dados do usuário com ID 5

// Request Param: Parâmentros que vem na própria rota que identificam um recurso
// Query Param: Parâmetros que vem na própria rota geralmente opcionais, servem para filtrar e paginar.
// Request Body: Parâmentros para criação/atualização de informações


//  ESTÃO COMENTADOS APENAS PARA SERVIREM DE EXEMPLO PARA CONSULTAS FUTURAS.

// app.get('/users', (request, response) => {
//     const filtroUsu = String(request.query.search);

//     const user = filtroUsu ? users.filter(user => user.includes(filtroUsu)) : users;

//     response.json(user);
// });

// app.get('/users/:id', (request, response) => {
//     const id = Number(request.params.id);

//     const user = users[id];

//     response.json(user);
// });

// app.post('/users', (request, response) => {
//     const data = request.body;

//     const user = {
//         name: data.name,
//         email: data.email 
//     };
//     return response.json(user);
// })

//app.listen(3333);