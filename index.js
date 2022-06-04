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
    const usersCollection = client.db("a-coders-diary").collection("users");
    const postsCollection = client.db("a-coders-diary").collection("posts");
    const tagsCollection = client.db("a-coders-diary").collection("tags");

    try {
        await client.connect();

        // find all users
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = usersCollection.find(query);

            const users = await cursor.toArray();

            if ((await users?.countDocuments) === 0) {
                res.send("No user found!");
            }
            else {
                res.send(users);
            };
        });

        // create a user
        app.post('/create-user', async (req, res) => {
            const userData = req?.body;

            const result = await usersCollection.insertOne(userData);

            res.send(result);
        });

        // find user with email
        app.get('/users', async (req, res) => {
            const userEmail = req?.query?.userEmail;
            const query = { userEmail: userEmail };
            const user = await usersCollection.find(query).toArray();

            return res.send(user);
        });

        // delete a user
        app.delete('/delete-user/:_id', async (req, res) => {
            const _id = req?.params?._id;
            const query = { _id: ObjectId(_id) };
            const user = await usersCollection.deleteOne(query);

            res.send(user);
        });

        // author details
        app.get('/author-details/:_id', async (req, res) => {
            const _id = req?.params?._id;
            const query = { _id: ObjectId(_id) };
            const authorDetails = await usersCollection.findOne(query);

            res.send(authorDetails);
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

        // post details
        app.get('/post-details/:_id', async (req, res) => {
            const _id = req?.params?._id;
            const query = { _id: ObjectId(_id) };
            const post = await postsCollection.findOne(query);

            res.send(post);
        });

        // user specific posts
        app.get('/my-posts', async (req, res) => {
            const postAuthor = req.query.postAuthor;
            console.log(postAuthor);
            const query = { postAuthor: postAuthor };
            const posts = await postsCollection.find(query).toArray();

            return res.send(posts);
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

        // delete a post
        app.delete('/delete-post/:_id', async (req, res) => {
            const _id = req?.params?._id;
            const query = { _id: ObjectId(_id) };
            const post = await postsCollection.deleteOne(query);

            res.send(post);
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