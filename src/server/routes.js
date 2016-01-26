var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/todos', getTodos);
router.get('/todos/:id', getTodo);
router.post('/todos', postTodo);
router.put('/todos/:id', putTodo);
router.delete('/todos/:id', deleteTodo);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getTodos(req, res, next) {
    res.status(200).send(data.getTodos());
}

function getTodo(req, res, next) {
    var id = +req.params.id;
    var todos = data.getTodos();
    var todo = todos.filter(function(p) {
        return p.id === id;
    })[0];

    if (todo) {
        res.status(200).send(todo);
    } else {
        four0four.send404(req, res, 'TODO ' + id + ' not found');
    }
}

function postTodo(req, res, next) {
    if (!req.body.description) {
        res.status(400).send('A description value is required');
    }
    if (!req.body.assignedTo) {
        res.status(400).send('An assignedTo value is required');
    }

    var todo = {
        description: '' + req.body.description,
        assignedTo: '' + req.body.assignedTo,
        isCompleted: req.body.isCompleted ? true : false
    };
    data.addTodo(todo);

    res.status(201).send(todo);
}

function putTodo(req, res, next) {
    var id = +req.params.id;
    if (id !== req.body.id) {
        res.status(400).send('Id in payload must match URL');
    }

    var todos = data.getTodos();
    var todo = todos.filter(function(p) {
        return p.id === id;
    })[0];

    if (todo) {
        todo.isCompleted = req.body.isCompleted;
        res.status(200).send(todo);
    } else {
        four0four.send404(req, res, 'TODO ' + id + ' not found');
    }
}

function deleteTodo(req, res, next) {
    var id = +req.params.id;
    var found = false;
    var todos = data.getTodos();
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos.splice(i, 1);
            found = true;
            break;
        }
    }

    if (found) {
        res.status(200).send();
    } else {
        four0four.send404(req, res, 'TODO ' + id + ' not found');
    }
}
