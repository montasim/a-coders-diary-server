const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x7gv5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const postsCollection = client.db("a-coders-diary").collection("posts");

    try {
        await client.connect();

        // create a post
        app.post('/create-post', async (req, res) => {
            const postData = req?.body;

            const result = await postsCollection.insertOne(postData);

            res.send(result);
        });

    } finally {
        // await client.close();
    };
};

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});