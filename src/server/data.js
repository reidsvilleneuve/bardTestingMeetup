module.exports = {
    getTodos: getTodos,
    addTodo: addTodo
};

var id = 1;
var data = [
    {id: id++, description: 'Buy groceries', assignedTo: 'Bob', isCompleted: false},
    {id: id++, description: 'Clean car', assignedTo: 'Jane', isCompleted: true},
    {id: id++, description: 'Sign up kids for sports', assignedTo: 'Bob', isCompleted: false},
    {id: id++, description: 'Winterize sprinklers', assignedTo: 'Bob', isCompleted: true},
    {id: id++, description: 'Buy new computer', assignedTo: 'Jane', isCompleted: false},
    {id: id++, description: 'Put snow tires on car', assignedTo: 'Bob', isCompleted: false}
];

function getTodos() {
    return data;
}

function addTodo(todo) {
    todo.id = id++;
    data.push(todo);
}
