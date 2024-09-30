const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please enter your task to do"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  iscompleted: {
    type: Boolean,
    default: false,
  },
});

const todolist = mongoose.model("todolist", todoSchema);
module.exports = todolist;
