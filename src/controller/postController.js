import fs from "fs"; // Importa o módulo fs para manipulação de arquivos
import { getAllPosts, createPost, updatePost } from "../models/postModel.js"; // Importa funções para obter e criar posts
import generateDescriptionWithGemini from "../services/geminiService.js";

// Função para listar todos os posts
export async function listPosts(req, res) {
    // Obtém todos os posts do banco de dados
    const posts = await getAllPosts();

    // Envia os posts como resposta em formato JSON
    res.status(200).json(posts);
}

// Função para fazer upload de imagem e criar um novo post
export async function uploadImg(req, res) {
    // Cria um novo objeto de post com informações da imagem
    const newPost = {
        description: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // Cria o post no banco de dados
        const createdPost = await createPost(newPost);

        // Renomeia o arquivo da imagem para usar o ID do post criado
        const updatedImg = `uploads/${createdPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImg);

        // Envia o post criado como resposta
        res.status(200).json(createdPost);
    } catch (error) {
        // Trata erros e envia uma resposta de erro
        console.log(error.message);
        res.status(500).json({ "Error": "Falha na requisição" });
    }
}

// Função para criar um novo post sem imagem
export async function createNewPost(req, res) {
    // Obtém os dados do novo post da requisição
    const newPost = req.body;

    try {
        // Cria o post no banco de dados
        const createdPost = await createPost(newPost);

        // Envia o post criado como resposta
        res.status(200).json(createdPost);
    } catch (error) {
        // Trata erros e envia uma resposta de erro
        console.log(error.message);
        res.status(500).json({ "Error": "Falha na requisição" });
    }
}

// Função para criar um novo post sem imagem
export async function updateNewPost(req, res) {
    // Obtém os dados do novo post da requisição
    const id = req.params.id;
    const imgUrl = `http://localhost:3000/${id}.png`


    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const description = await generateDescriptionWithGemini(imgBuffer);

        const post = {
            imgUrl: imgUrl,
            description: description,
            alt: req.body.alt
        }

        // Cria o post no banco de dados
        const createdPost = await updatePost(id, post);

        // Envia o post criado como resposta
        res.status(200).json(createdPost);
    } catch (error) {
        // Trata erros e envia uma resposta de erro
        console.log(error.message);
        res.status(500).json({ "Error": "Falha na requisição" });
    }
}