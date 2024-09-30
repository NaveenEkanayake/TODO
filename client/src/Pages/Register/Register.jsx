import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import wallpaper from "./images/background.webp";
import NavBar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer";
import { registerUser } from "../../API/UserAPI"; // Import the registerUser function
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import LoadingIcon from "@mui/icons-material/HourglassEmpty"; // Import your desired Material UI icon

const RegisterPage = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const validate = () => {
    const { name, email, password } = inputs;
    if (!name) {
      toast.error("Name is required!");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const sendRequest = async () => {
    try {
      const data = await registerUser({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      toast.success("Registration successful! Please login.");
      return data;
    } catch (error) {
      toast.error(`Registration error: ${error.message}`);
      console.error("Registration error:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    setLoading(true);

    if (validate()) {
      sendRequest().then(() => {
        setTimeout(() => {
          setLoading(false);
          history("/login");
        }, 2000);
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Box
            component={Paper}
            elevation={3}
            sx={{
              padding: 4,
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              position: "relative",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginBottom: 3,
                textAlign: "center",
                fontFamily: "'Times New Roman', Times, serif",
              }}
            >
              Register
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                onChange={handleChange}
                fullWidth
                value={inputs.name}
                label="Username"
                variant="outlined"
                margin="normal"
                sx={{ marginBottom: 2 }}
                required
              />
              <TextField
                name="email"
                onChange={handleChange}
                fullWidth
                type="email"
                value={inputs.email}
                label="Email"
                variant="outlined"
                margin="normal"
                sx={{ marginBottom: 2 }}
                required
              />
              <TextField
                name="password"
                onChange={handleChange}
                fullWidth
                value={inputs.password}
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
              />
              <Box sx={{ width: "100%" }}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="error"
                  sx={{
                    borderColor: "#EF4444",
                    color: "#EF4444",
                    marginTop: 3,
                    borderRadius: "20px",
                    fontFamily: "'Times New Roman', Times, serif",
                    "&:hover": {
                      backgroundColor: "#EF4444",
                      color: "white",
                      borderColor: "#EF4444",
                    },
                    width: "100%",
                    position: "relative",
                  }}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? (
                    <motion.div
                      initial={{ rotate: 0 }} // Starting rotation
                      animate={{ rotate: 360 }} // Full rotation
                      transition={{
                        repeat: Infinity,
                        duration: 60,
                        ease: "linear",
                      }}
                    >
                      <LoadingIcon
                        style={{ color: "#EF4444", marginRight: 1 }}
                      />
                    </motion.div>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Box>
            </form>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                marginTop: 3,
                fontFamily: "'Times New Roman', Times, serif",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#EF4444",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </Box>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default RegisterPage;
