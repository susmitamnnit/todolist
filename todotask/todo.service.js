const db = require("../_helper/db");
const Todo =db.Todo;

module.exports = {
    addTask,
    getAllTask,
    updateTask,
    deleteTask,
    getById,
  };

async function addTask(taskParam) {
        const todo = new Todo(taskParam)
        await todo.save();  
  }

  async function getAllTask() {
    return await Todo.find().select();
}

async function deleteTask(id) {
  await Todo.findByIdAndRemove(id);
}

async function updateTask(id, taskParam) {
  const todo = await Todo.findOne({id});

  if (!todo) throw 'task not found in todolist';
  todo.name = taskParam.name
  await todo.save();
}

async function getById(id) {
  return await Todo.findById(id)
}