import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../Navbar/images/logo.png";
import { verifyUser } from "../../API/UserAPI";
import { LogoutReq } from "../../API/UserAPI"; // Correct import for LogoutReq
import { authActions } from "../../Store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavDash = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await LogoutReq();
      dispatch(authActions.logout());
      toast.success("Successfully logged out!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(error.message || "Error during logout", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      handleCloseMenu();
    }
  };

  useEffect(() => {
    verifyUser()
      .then((data) => setUser(data.user))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
        <Toolbar className="container mx-auto flex justify-between items-center">
          <Box className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-xl mr-2" />
            <Typography
              variant="h6"
              sx={{
                color: "red",
                fontFamily: "Times New Roman",
                letterSpacing: "1px",
              }}
            >
              TODO
            </Typography>
          </Box>

          {/* Hamburger Menu Icon for Mobile */}
          <Box className="md:hidden">
            <IconButton onClick={toggleMenu} color="inherit">
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </IconButton>
          </Box>

          {/* Drawer for Mobile Menu */}
          <Drawer anchor="right" open={isMenuOpen} onClose={handleClose}>
            <Box
              sx={{
                width: 250,
                backgroundColor: "black",
                color: "white",
                padding: "16px",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <IconButton
                onClick={handleClose}
                sx={{ color: "white", alignSelf: "flex-end" }}
              >
                <FiX size={24} />
              </IconButton>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <Avatar
                  sx={{ cursor: "pointer", marginBottom: 2 }}
                  onClick={handleAvatarClick}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  sx={{ marginTop: "40px" }}
                >
                  <MenuItem disabled>
                    Welcome!!!,{" "}
                    {user ? (
                      <span style={{ fontSize: "14px" }}>{user.name}</span>
                    ) : (
                      "Guest"
                    )}
                  </MenuItem>
                  {isLoggedIn && (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  )}
                </Menu>
              </Box>
            </Box>
          </Drawer>

          {/* Avatar Menu for larger screens */}
          <Box className="hidden md:flex">
            <Avatar sx={{ cursor: "pointer" }} onClick={handleAvatarClick} />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              sx={{ marginTop: "40px" }}
            >
              <MenuItem disabled>
                Welcome!!!,{" "}
                {user ? (
                  <span style={{ fontSize: "14px" }}>{user.name}</span>
                ) : (
                  "Guest"
                )}
              </MenuItem>
              {isLoggedIn && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <ToastContainer />
    </>
  );
};

export default NavDash;
