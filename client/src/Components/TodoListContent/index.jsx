import React, { useState } from "react";
import { IconButton, TextField, Box, Typography } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import backgroundImage from "./images/Backgroundtodo.jpg";

const TodoContent = () => {
  const [todoTasks, settodoTasks] = useState{[{
    task: "hello there",
    isCompleted: false,
  }]}
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
      </Box>
    </Box>
  );
};

export default TodoContent;
