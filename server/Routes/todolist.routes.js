const express = require("express");
const {
  getTasks,
  getTaskByName,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/todocontroller");
const { verifyToken } = require("../controller/user-controller");

const router = express.Router();
router.get("/gettasks", verifyToken, getTasks);
router.get("/tasks/name/:task", verifyToken, getTaskByName);
router.get("/tasks/:id", verifyToken, getTaskById);
router.post("/createtasks", verifyToken, createTask);
router.put("/UpdateTasks/:id", verifyToken, updateTask);
router.delete("/DeleteTasks/:id", verifyToken, deleteTask);

module.exports = router;
