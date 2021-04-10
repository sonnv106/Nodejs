// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set("view engine", "pug");
app.set("views", "./views");
// https://expressjs.com/en/starter/basic-routing.html
var todos = [
  { id: 1, work: "Đi học" },
  { id: 2, work: "Nấu cơm" },
  { id: 3, work: "Rửa bát" },
  { id: 4, work: "Học tại coderX" }
];
app.get("/", (req, res) => {
  res.render("index", {
    todos: todos
  });
});
app.get("/todos", (req, res) => {
  var q = req.query.q;
  var matchedTodos = todos.filter(function(todo) {
    return todo.work.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("index", {
    todos: matchedTodos
  });
});
app.post("/todos/create", (req, res) => {
  todos.push(req.body);
  res.redirect("/")
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
