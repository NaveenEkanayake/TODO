import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import wallpaper from "./images/background.webp";
import { AuthenticatedUser } from "../../api/UserAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index";

const Loginform = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
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

  const sendRequest = async () => {
    try {
      const data = await AuthenticatedUser({
        email: inputs.email,
        password: inputs.password,
      });
      if (data) {
        toast.success("Login Successful!");
        return data;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error(`Login error: ${error.message}`);
      console.error("Login error:", error.message);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    setLoading(true);

    sendRequest().then((data) => {
      if (data) {
        dispatch(authActions.login());
        setTimeout(() => {
          setLoading(false);
          history("/todo");
        }, 2000);
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <>
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
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="email"
                value={inputs.email}
                onChange={handleChange}
                type="email"
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                sx={{ marginBottom: 2 }}
                required
              />
              <TextField
                name="password"
                value={inputs.password}
                onChange={handleChange}
                type="password"
                fullWidth
                label="Password"
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
                  }}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
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
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#EF4444",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Loginform;
