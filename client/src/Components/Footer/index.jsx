import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import facebookIcon from "./images/Facebook.png";
import instagramIcon from "./images/insta.png";
import twitterIcon from "./images/Twitter.png";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "black", color: "white" }}>
      <Container>
        <Box py={6}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontFamily: "Times New Roman" }}
              >
                Quick Links
              </Typography>
              <Box display="flex" flexDirection="row" gap={2}>
                <Link to="/home" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    className="hover:text-red-500 transition duration-300"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    Home
                  </Typography>
                </Link>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    className="hover:text-red-500 transition duration-300"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    About Us
                  </Typography>
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    className="hover:text-red-500 transition duration-300"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    Login
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Typography
                variant="body2"
                style={{ fontFamily: "Times New Roman" }}
              >
                We strive to provide the best service for you.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontFamily: "Times New Roman" }}
              >
                Connect with Us
              </Typography>
              <Box display="flex" justifyContent="center" gap={2}>
                <IconButton
                  component="a"
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={facebookIcon}
                    alt="Facebook"
                    className="w-6 h-6 filter brightness-0 invert transition duration-300 hover:brightness-100"
                  />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={instagramIcon}
                    alt="Instagram"
                    className="w-6 h-6 filter brightness-0 invert transition duration-300 hover:brightness-100"
                  />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={twitterIcon}
                    alt="Twitter"
                    className="w-6 h-6 transition duration-300"
                  />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ borderColor: "white", marginY: 2 }} />
          <Box
            textAlign="center"
            style={{ fontFamily: "Times New Roman", letterSpacing: "1px" }}
          >
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} TODO. All Rights Reserved.
            </Typography>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
