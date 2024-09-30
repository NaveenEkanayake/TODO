import React from "react";
import { Box } from "@mui/material";

const DotSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-400"></div>
      </div>
    </Box>
  );
};

export default DotSpinner;
