import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { TfiMenuAlt } from "react-icons/tfi";

import { RxAvatar } from "react-icons/rx";

import { useNavigate } from "react-router-dom";
interface NavbarProps {
  handleDrawerToggle: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    localStorage.clear();
    navigate("/");
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#FFFFFF",
          width: { sm: `calc(100% - 260px)` },
          borderRadius: 2,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { lg: "none", md: "none" },
                color: "black",
              }}
            >
              <TfiMenuAlt />
            </IconButton>
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "right",
                display: "flex",
                flexDirection: "column",
                color: "black",
                p: 2,
              }}
            >
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 600,
                  fontSize: "25px",
                  color: "#464255",
                }}
              >
                Welcome!
              </Typography>
              <span style={{ color: "#464255" }}>
                {localStorage.getItem("name")}
              </span>
            </Box>
          </Box>
          <Box>
            <Avatar
              // sx={{ background: "#662671", cursor: "pointer" }}
              onClick={handleOpenDialog}
              src={`${process.env.REACT_APP_API}${localStorage.getItem(
                "profile"
              )}`}
            >
              {/* <RxAvatar style={{ width: "65px", height: "30px" }} /> */}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
