// Importa o framework Express para rotas e servidor web
import express from "express";
// Importa o Multer para lidar com uploads de arquivos
import multer from "multer";
import cors from "cors";
// Importa funções para posts do arquivo de controlador
import { createNewPost, listPosts, updateNewPost, uploadImg } from "../controller/postController.js";


const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};


// Configura armazenamento do Multer (pasta uploads/)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 1 
    }
});


// Cria instância do Multer com configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });


// Função para definir rotas na aplicação Express
const routes = (app) => {
    // Habilita interpretação de dados JSON nas requisições
    app.use(express.json());
    app.use(cors(corsOptions));
    // Rota GET para listar posts (tratada por listPosts)
    app.get("/posts", listPosts);

    // Rota POST para criar novo post (tratada por createNewPost)
    app.post("/posts", createNewPost);

    // Rota POST para upload de imagem (usa upload.single e depois uploadImg)
    app.post("/upload", upload.single("image"), uploadImg);

    app.put("/upload/:id", updateNewPost)
};

// Exporta a função de rotas para uso na aplicação principal
export default routes;