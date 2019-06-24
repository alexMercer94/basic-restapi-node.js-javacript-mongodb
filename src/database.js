import MongoClient from 'mongodb';

export async function connect() {
    try {
        const client = await MongoClient.connect('mongodb://localhost', { useNewUrlParser: true });
        const db = client.db('node-resapi');
        console.log('\x1b[35m', 'DB is connected');
        return db;
    } catch (error) {
        console.log(error);
    }
}
