import "dotenv/config"
import { ObjectId } from "mongodb";
import connectDatabase from "../config/dbConfig.js";

// Conecta ao banco de dados e armazena a conexão
const connection = await connectDatabase(process.env.STRING_CONNECTION);


// Obtém todos os posts da coleção "posts"
export async function getAllPosts() {
    const db = connection.db("imersão-backend");
    const collection = db.collection("posts");
    return collection.find().toArray();
};

// Cria um novo post na coleção "posts"
export async function createPost(newPost) {
    const db = connection.db("imersão-backend");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
}

// Cria um novo post na coleção "posts"
export async function updatePost(id, newPost) {
    const db = connection.db("imersão-backend");
    const collection = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return collection.updateOne({_id:new ObjectId(objId)}, {$set:newPost});
}