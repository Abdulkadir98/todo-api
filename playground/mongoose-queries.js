const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '59855aa5cef889148486c0d3';

User.findById(id).then((user) => {
    if(!user){
        return console.log('Id not found.');
    }
    console.log('User', user);
}).catch((e) => console.log(e));

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found!');
//     }
//     console.log('Todo by Id', todo);
// });