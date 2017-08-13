const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


Todo.findByIdAndRemove('598ff35d6a365618c8550e43').then((todo) => {
    console.log(todo);
});