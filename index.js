const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x7gv5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const userCollection = client.db("a-coders-diary").collection("users");
    const postsCollection = client.db("a-coders-diary").collection("posts");
    const tagsCollection = client.db("a-coders-diary").collection("tags");

    try {
        await client.connect();

        // create a user
        app.post('/create-user', async (req, res) => {
            const userData = req?.body;

            const result = await userCollection.insertOne(userData);

            res.send(result);
        });

        // find all posts
        app.get('/posts', async (req, res) => {
            const query = {};
            const cursor = postsCollection.find(query);

            const posts = await cursor.toArray();

            if ((await cursor?.countDocuments) === 0) {
                res.send("No post found!");
            }
            else {
                res.send(posts);
            };
        });

        // edit a post
        app.get('/edit-post/:_id', async (req, res) => {
            const _id = req?.params?._id;
            const query = { _id: ObjectId(_id) };
            const post = await postsCollection.findOne(query);

            res.send(post);
        });

        // create a post
        app.post('/create-post', async (req, res) => {
            const postData = req?.body;

            const result = await postsCollection.insertOne(postData);

            res.send(result);
        });

        // find all tags
        app.get('/tags', async (req, res) => {
            const query = {};
            const cursor = tagsCollection.find(query);

            const tags = await cursor.toArray();

            if ((await cursor?.countDocuments) === 0) {
                res.send("No tag found!");
            }
            else {
                res.send(tags);
            };
        });

        // add a tag
        app.post('/add-tag', async (req, res) => {
            const tagData = req?.body;

            const result = await tagsCollection.insertOne(tagData);

            res.send(result);
        });

        // edit a tag
        app.get('/edit-tag/:_id', async (req, res) => {
            const _id = req?.params?._id;
            const query = { _id: ObjectId(_id) };
            const tag = await tagsCollection.findOne(query);

            res.send(tag);
        });

        // delete a tag
        app.delete('/delete-tag/:_id', async (req, res) => {
            const _id = req?.params?._id;
            console.log(_id)
            const query = { _id: ObjectId(_id) };
            const tag = await tagsCollection.deleteOne(query);

            res.send(tag);
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