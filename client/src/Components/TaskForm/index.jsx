import React, { useState } from "react";
import {
  IconButton,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";

const TaskForm = ({ task, setTask, status, setStatus, handleAddTask }) => {
  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: 2,
        width: "100%",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Enter your task"
        value={task}
        onChange={handleTaskChange}
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
          width: "100%",
          borderRadius: "4px",
          marginRight: 1,
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
      <FormControl variant="outlined" sx={{ marginRight: 1, minWidth: 120 }}>
        <InputLabel id="status-select-label" sx={{ color: "white" }}>
          Status
        </InputLabel>
        <Select
          labelId="status-select-label"
          value={status}
          onChange={handleStatusChange}
          label="Status"
          sx={{
            color: "white",
            "& .MuiSelect-select": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
            "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
          }}
        >
          <MenuItem value="Not Completed" sx={{ color: "black" }}>
            Not Completed
          </MenuItem>
          <MenuItem value="Completed" sx={{ color: "black" }}>
            Completed
          </MenuItem>
        </Select>
      </FormControl>
      <IconButton
        onClick={handleAddTask}
        sx={{
          backgroundColor: "red.500",
          color: "white",
          "&:hover": {
            backgroundColor: "darkred",
          },
          borderRadius: "50%",
          padding: 1,
        }}
      >
        <FiPlus />
      </IconButton>
    </Box>
  );
};

export default TaskForm;
