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
  TextField,
} from "@mui/material";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
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
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
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

          {/* Search Bar in the Middle for Desktop */}
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              margin: "0 auto",
              width: "300px",
              transition: "width 0.4s ease",
              "&:hover": {
                width: "300px", // Expand on hover
              },
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search task"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: "4px 0 0 4px",
                "& input": {
                  color: "black",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:focus .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
            <IconButton
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "transparent",
                borderRadius: "0 4px 4px 0",
                "&:hover": {
                  color: "darkred",
                },
              }}
            >
              <FiSearch />
            </IconButton>
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

              {/* Search Bar in the Drawer for Mobile */}
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Search task"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  sx={{
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: "4px 0 0 4px",
                    "& input": {
                      color: "black",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&:focus .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
                <IconButton
                  type="submit"
                  sx={{
                    color: "white",
                    backgroundColor: "transparent",
                    borderRadius: "0 4px 4px 0",
                    "&:hover": {
                      color: "darkred",
                    },
                  }}
                >
                  <FiSearch />
                </IconButton>
              </Box>

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
