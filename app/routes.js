//load the todo model
var Todo = require('./models/todo');

//expose routes to the app
module.exports = function(app) {
  //get all todos
  app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
      if (err)
        res.send(err)

      res.json(todos);
    });
  });

  //create todo
  app.post('/api/todos', function(req, res) {
    Todo.create({
      text : req.body.text,
      done : false
    }, function(err, todo) {
      if (err)
        res.send(err);

      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

  //delete todo
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });
};
