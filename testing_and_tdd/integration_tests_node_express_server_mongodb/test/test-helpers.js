import { MongoClient } from 'mongodb';

const connectToMongo = async () => {
    const client = await MongoClient.connect(
        `mongodb://localhost:27017/TEST_DB`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    const db = client.db('TEST_DB');
    return client, db
}

export const setDatabaseData = async (collectionName, data) => {
    client, db = connectToMongo();
    await db.collection(collectionName).insertMany(data);
    client.close();
};

export const getDatabaseData = async collectionName => {
    client, db = connectToMongo();
    const result = await db.collection(collectionName).find().toArray();
    client.close();
    return result;
};

export const resetDatabase = async () => {
    client, db = connectToMongo();
    await db.dropDatabase();
    client.close();
};
