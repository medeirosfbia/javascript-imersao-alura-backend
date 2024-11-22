import express from "express";
import routes from "./src/routes/postsRoutes.js";


// **Define um array de posts (opcional)**
// Este array contém dados de posts de exemplo e seria usado caso você não tivesse um banco de dados configurado.
// Como você já está conectando ao banco de dados, es te bloco pode ser removido.
// const posts = [
//     // ... dados dos posts
// ];

// **Cria uma instância do Express**
// Inicializa o framework Express para criar uma aplicação web.
const app = express();
app.use(express.static("uploads"));
routes(app);

// **Inicia o servidor na porta 3000**
// Inicia o servidor Express e escuta por requisições na porta 3000.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});



// function findPostById(id) {
//     return posts.findIndex((post) => {
//         return post.id == Number(id);
//     });
// };

// app.get("/posts/:id", (req, res) => {
//     const index = findPostById(req.params.id);
//     res.status(200).json(posts[index]);
// });