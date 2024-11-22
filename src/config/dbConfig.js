import { MongoClient } from 'mongodb'; // Importa o cliente MongoDB para interagir com o banco de dados.

export default async function connectDatabase(stringConnection) { // Define uma função assíncrona para conectar ao banco de dados, exportando-a como padrão.
    let mongoClient; // Declara uma variável para armazenar o cliente MongoDB.

    try { // Inicia um bloco try-catch para tratar possíveis erros.
        mongoClient = new MongoClient(stringConnection); // Cria uma nova instância do cliente MongoDB usando a string de conexão fornecida.
        console.log('Conectando ao cluster do banco de dados...'); // Imprime uma mensagem no console indicando que a conexão está sendo estabelecida.
        await mongoClient.connect(); // Conecta ao banco de dados de forma assíncrona.
        console.log('Conectado ao MongoDB Atlas com sucesso!'); // Imprime uma mensagem de sucesso após a conexão.

        return mongoClient; // Retorna o cliente MongoDB para uso em outras partes do código.
    } catch (error) { // Captura qualquer erro que possa ocorrer durante a conexão.
        console.error('Falha na conexão com o banco!', error); // Imprime uma mensagem de erro no console, junto com o objeto de erro.
        process.exit(); // Encerra a aplicação em caso de erro na conexão.
    }   
};