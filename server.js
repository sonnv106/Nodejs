// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", "./views");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ todos: [] }).write();

const shortid = require('shortid');



app.get("/", (req, res) => {
  res.render("index", {
    todos: db.get("todos").value()
  });
});
app.get("/todos", (req, res)=>{
  var q= req.query.q;
  var todos= db.get("todos").value();
  var matchedTodos = todos.filter(x=>x.work.toLowerCase().indexOf(q.toLowerCase())!==-1)
  res.render("index", {
    todos: matchedTodos
  })
})
app.post("/todos/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("todos").push(req.body).write();
  res.redirect("/");
});
app.get("/todos/:id/delete", (req, res)=>{
  var id = req.params.id;
  db.get("todos").remove({id:id}).write();
  res.redirect("/")
  
  
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});


// Set some defaults (required if your JSON file is empty)

