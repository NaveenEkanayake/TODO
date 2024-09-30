import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  Box,
} from "@mui/material";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../Navbar/images/logo.png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      const scrollHome = document.getElementById("home");
      if (scrollHome) {
        scrollHome.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
    }
  };

  return (
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
        <Box className="md:hidden">
          <IconButton onClick={toggleMenu} color="inherit">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </IconButton>
        </Box>
        <Drawer anchor="right" open={isMenuOpen} onClose={handleClose}>
          <Box
            sx={{
              width: 250,
              backgroundColor: "black",
              color: "white",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "16px",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                alignSelf: "flex-end",
                color: "white",
                marginBottom: "16px",
              }}
            >
              <FiX size={24} />
            </IconButton>
            <List>
              <ListItem sx={{ padding: "8px 0" }}>
                <div className="relative group">
                  <Typography
                    variant="body1"
                    component="span"
                    onClick={() => {
                      handleHomeClick();
                      handleClose();
                    }}
                    sx={{
                      cursor: "pointer",
                      color: "inherit",
                      "&:hover": { color: "red" },
                    }}
                  >
                    Home
                  </Typography>
                  <span className="block h-1 bg-red-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </div>
              </ListItem>
              <ListItem sx={{ padding: "8px 0" }}>
                <ScrollLink
                  to="aboutus"
                  smooth={true}
                  duration={500}
                  onClick={handleClose}
                  className="relative group"
                >
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{
                      cursor: "pointer",
                      color: "inherit",
                      "&:hover": { color: "red" },
                    }}
                  >
                    About Us
                  </Typography>
                  <span className="block h-1 bg-red-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </ScrollLink>
              </ListItem>
            </List>
            {/* Move the Login button below the list */}
            <ListItem sx={{ padding: "8px 0", marginTop: "auto" }}>
              <Link to="/login" style={{ width: "100%" }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    borderColor: "red",
                    color: "red",
                    "&:hover": {
                      backgroundColor: "red",
                      color: "white",
                    },
                    width: "100%",
                  }}
                  onClick={handleClose}
                >
                  Login
                </Button>
              </Link>
            </ListItem>
          </Box>
        </Drawer>
        {/* Desktop Menu */}
        <Box className="hidden md:flex">
          <div className="relative group">
            <Typography
              variant="body1"
              component="span"
              onClick={handleHomeClick}
              sx={{
                cursor: "pointer",
                color: "inherit",
                "&:hover": { color: "red" },
              }}
            >
              Home
            </Typography>
            <span className="block h-1 bg-red-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </div>
          <ScrollLink
            to="aboutus"
            smooth={true}
            duration={500}
            className="relative group"
          >
            <Typography
              variant="body1"
              component="span"
              sx={{
                cursor: "pointer",
                color: "inherit",
                "&:hover": { color: "red" },
                marginLeft: 2,
              }}
            >
              About Us
            </Typography>
            <span className="block h-1 bg-red-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </ScrollLink>
          <Link to="/login">
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: "red",
                color: "red",
                marginLeft: 2,
                "&:hover": {
                  backgroundColor: "red",
                  color: "white",
                },
              }}
              onClick={handleClose}
            >
              Login
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
