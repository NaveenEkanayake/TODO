import React, { useEffect, useState } from "react";
import {
  IconButton,
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";
import {
  CheckCircleOutline,
  HighlightOff,
  Edit,
  Delete,
} from "@mui/icons-material";
import backgroundImage from "./images/Backgroundtodo.jpg";
import axios from "axios";
import Spinner from "../Spinner/index";

const TodoContent = () => {
  const [task, setTask] = useState("");
  const [todoTasks, setTodoTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/gettasks");
        if (response.data && Array.isArray(response.data.tasks)) {
          setTodoTasks(response.data.tasks);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task) return;
    setLoading(true);
    setRefreshing(true);

    try {
      const result = await axios.post("http://localhost:3000/api/createtasks", {
        task,
        iscompleted: false,
      });

      console.log("Task added successfully:", result.data);
      setTodoTasks((prevTasks) => [...prevTasks, result.data]);
      setTask("");
      window.location.reload();
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const handleEditTask = async (id) => {
    if (!editingTaskText) return;
    setLoading(true);
    setRefreshing(true);

    try {
      const result = await axios.put(
        `http://localhost:3000/api/UpdateTasks/${id}`,
        {
          task: editingTaskText,
          iscompleted: isCompleted,
        }
      );
      console.log("Task updated successfully:", result.data);

      setTodoTasks((prevTasks) =>
        prevTasks.map((todo) =>
          todo._id === id
            ? { ...todo, task: editingTaskText, iscompleted: isCompleted }
            : todo
        )
      );
      setEditingTaskId(null);
      setEditingTaskText("");
      setIsCompleted(false);
    } catch (err) {
      console.error("Error editing task:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    setRefreshing(true);
    try {
      await axios.delete(`http://localhost:3000/api/DeleteTasks/${id}`);
      console.log("Task deleted successfully");
      setTodoTasks((prevTasks) => prevTasks.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setRefreshing(false);
      }, 1000);
    }
  };
  const toggleCompletion = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    setLoading(true);

    try {
      const result = await axios.put(
        `http://localhost:3000/api/UpdateTasks/${id}`,
        {
          iscompleted: newStatus,
        }
      );
      console.log("Task completion status updated successfully:", result.data);
      setTodoTasks((prevTasks) =>
        prevTasks.map((todo) =>
          todo._id === id ? { ...todo, iscompleted: newStatus } : todo
        )
      );
    } catch (err) {
      console.error("Error updating task completion status:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust the delay time as needed (e.g., 2000 ms = 2 seconds)
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 2,
      }}
    >
      {refreshing && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <Spinner /> {/* Refreshing spinner */}
        </Box>
      )}

      <Box
        component="form"
        onSubmit={handleAddTask}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: { xs: 3, sm: 4 },
          width: "90%",
          maxWidth: "500px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            letterSpacing: "2px",
            fontFamily: "'Times New Roman', serif",
            marginBottom: 2,
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          TODOLIST
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <TextField
            variant="outlined"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your task"
            InputProps={{
              sx: {
                color: "white",
                "&::placeholder": {
                  color: "white",
                },
              },
            }}
            sx={{
              flex: 1,
              marginBottom: { xs: 1, sm: 0 },
              "& .MuiOutlinedInput-root": {
                borderColor: "red",
                "&:hover fieldset": {
                  borderColor: "red",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
          <IconButton
            type="submit"
            sx={{
              backgroundColor: "red.500",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
              borderRadius: "50%",
              padding: 1,
              height: { xs: "50px", sm: "56px" },
              width: { xs: "50px", sm: "56px" },
              minWidth: "56px",
            }}
          >
            <FiPlus size={24} />
          </IconButton>
        </Box>

        {/* Task List Section */}
        <List sx={{ width: "100%", marginTop: 2 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
              <Spinner />
            </Box>
          ) : todoTasks.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: "white", textAlign: "center" }}
            >
              No tasks available.
            </Typography>
          ) : (
            todoTasks.map((todo) => (
              <ListItem
                key={todo._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: 1,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "5px",
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ color: "white" }}>
                      {editingTaskId === todo._id ? (
                        <TextField
                          variant="outlined"
                          value={editingTaskText}
                          onChange={(e) => setEditingTaskText(e.target.value)}
                          placeholder="Edit your task"
                          InputProps={{
                            sx: {
                              color: "white",
                              "&::placeholder": {
                                color: "white",
                              },
                            },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderColor: "red",
                              "&:hover fieldset": {
                                borderColor: "red",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "red",
                              },
                            },
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            textDecoration: todo.iscompleted
                              ? "line-through"
                              : "none",
                            color: todo.iscompleted ? "green" : "white", // Change text color based on completion status
                          }}
                        >
                          {todo.task}
                        </span>
                      )}
                    </Typography>
                  }
                />
                <Box>
                  <IconButton
                    onClick={() => toggleCompletion(todo._id, todo.iscompleted)}
                    color={todo.iscompleted ? "success" : "error"}
                  >
                    {todo.iscompleted ? (
                      <CheckCircleOutline />
                    ) : (
                      <HighlightOff />
                    )}
                  </IconButton>
                  {editingTaskId === todo._id ? (
                    <IconButton
                      onClick={() => handleEditTask(todo._id)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => {
                          setEditingTaskId(todo._id);
                          setEditingTaskText(todo.task);
                          setIsCompleted(todo.iscompleted); // Set current completion status for editing
                        }}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteTask(todo._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </Box>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Box>
  );
};

export default TodoContent;
