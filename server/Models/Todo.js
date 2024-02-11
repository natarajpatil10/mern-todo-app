const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    task: String,
});

const TodoModel = mongoose.model('Todo', ToDoSchema);
module.exports = TodoModel;
