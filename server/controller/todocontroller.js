const { ObjectId } = require("mongoose").Types;
const todolist = require("../models/todo.schema");
const User = require("../models/User.schema.js");

const getTasks = async (req, res) => {
  const userId = req.id; // Get user ID from the token
  let userEmail;

  try {
    const user = await User.findById(userId, "email");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    userEmail = user.email;
    const tasks = await todolist.find({ user: userId });
    if (tasks.length === 0) {
      return res.status(404).json({
        message: `No tasks found for your account (${userEmail}).`,
      });
    }

    // Return tasks with a success message
    res.status(200).json({
      message: `Tasks retrieved successfully for your account (${userEmail}).`,
      tasks, // Include the retrieved tasks in the response
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getTaskByName = async (req, res) => {
  const userId = req.id;
  const { task } = req.params;

  try {
    const taskItem = await todolist.findOne({ task: task, user: userId }); // Filter by user ID

    if (!taskItem) {
      return res
        .status(404)
        .json({ message: "Task not found for your account." });
    }

    res.status(200).json({
      message: "Task found successfully.",
      task: taskItem,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get a task by ID for the authenticated user
const getTaskById = async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const taskItem = await todolist.findOne({
      _id: new ObjectId(id),
      user: userId,
    });

    if (!taskItem) {
      return res
        .status(404)
        .json({ message: "Task not found for your account." });
    }

    res.status(200).json({
      message: "Task retrieved successfully.",
      task: taskItem,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const createTask = async (req, res) => {
  const userId = req.id;

  try {
    // Check if the userId is valid
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const existingTodo = await todolist.findOne({
      task: req.body.task.toLowerCase(),
      user: userId,
    });
    if (existingTodo) {
      return res.status(400).json({
        message: "Todo already exists for your account.",
      });
    }

    const newTask = await todolist.create({
      task: req.body.task,
      user: userId,
    });

    // Retrieve the user's email from the User model
    const user = await User.findById(userId);
    if (!user || !user.email) {
      return res
        .status(404)
        .json({ message: "User not found or email not available." });
    }

    res.status(201).json({
      message: `Task created successfully for your account (${user.email}).`,
      task: newTask,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};
const updateTask = async (req, res) => {
  const userId = req.id;
  const { id } = req.params;
  const trimmedId = id.trim();

  try {
    const updatedTask = await todolist.findOneAndUpdate(
      { _id: trimmedId, user: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or permission denied." });
    }

    res.status(200).json({
      message: "Task updated successfully.",
      task: updatedTask,
    });
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteTask = async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  try {
    const deletedTask = await todolist.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or permission denied." });
    }

    res.status(200).json({
      message: "Task deleted successfully.",
      task: deletedTask,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getTasks,
  getTaskByName,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
