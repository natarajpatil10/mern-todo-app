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
    TodoModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task,
    })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const task = req.body.task;
    TodoModel.findByIdAndUpdate({ _id: id }, { task: task })
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(data => res.json(data))
        .catch(err => res.json(err));
});
