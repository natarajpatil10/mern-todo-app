const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let dotenv = require('dotenv').config();
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json()); // converts data into JSON format

const PORT = 5000;
const MONGODB_URL = `mongodb+srv://${process.env.USER_NAME}:${encodeURIComponent(process.env.PASSWORD)}@cluster-todo.vominwa.mongodb.net/`;

app.listen(PORT, () => {
    console.log('Server is running at:', PORT);
});

mongoose.connect(MONGODB_URL);

app.get('/get-tasks', (req, res) => {
    // res.status(200).send('GET REQUEST Successful');
    console.log('GET REQUEST');
    res.location('http://localhost:5173/');
    TodoModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    res.location('http://localhost:5173/');
    TodoModel.create({
        task: task,
    })
        .then(result => {
            console.log('result -->', result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
});
