import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from "./images/backgroundtodo.jpg";

const UpdateTaskForm = () => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState({ task: "", isCompleted: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskData = async (taskId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/todo/${taskId}`
        );
        setTaskData({
          task: response.data.task,
          isCompleted: response.data.isCompleted,
        });
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTaskData(id);
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/todo/${id}`, {
        task: taskData.task,
        isCompleted: taskData.isCompleted,
      });
      console.log(response._id);
      console.log("Task updated successfully:", response.data);
      navigate("/todo");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => {
    navigate("/todo");
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
      <Box
        component="form"
        onSubmit={handleUpdate}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          width: "90%",
          maxWidth: "1000px",
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
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          Update Task
        </Typography>

        <TextField
          value={taskData.task}
          onChange={(e) => setTaskData({ ...taskData, task: e.target.value })}
          variant="outlined"
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
            width: "100%",
            marginBottom: 2,
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

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel sx={{ color: "white" }}>Status</InputLabel>
          <Select
            value={taskData.isCompleted ? "completed" : "not completed"}
            onChange={(e) =>
              setTaskData({
                ...taskData,
                isCompleted: e.target.value === "completed",
              })
            }
            variant="outlined"
            sx={{
              "& .MuiSelect-root": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "red",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
              },
            }}
          >
            <MenuItem value="not completed">Not Completed</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Update Task
        </Button>
        <Button onClick={handleCancel} variant="outlined" sx={{ marginTop: 1 }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateTaskForm;
