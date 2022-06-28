const express = require("express");
const router = express.Router();
const todoService = require("./todo.service");

//routes
router.post("/addTask", addTask);
router.get("/getAllTask", getAllTask);
router.get('/:id', getById);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;

function addTask(req, res, next) {
  todoService
    .addTask(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAllTask(req, res, next) {
  todoService
    .getAllTask()
    .then((todotask) => res.json(todotask))
    .catch((err) => next(err));
}

function getById(req, res, next) {
    todoService.getById(req.params.id)
        .then(todotask => todotask ? res.json(todotask) : res.sendStatus(404))
        .catch(err => next(err));
}


function deleteTask(req, res, next) {
    todoService
    .deleteTask(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function updateTask(req, res, next) {
    todoService
    .updateTask(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
