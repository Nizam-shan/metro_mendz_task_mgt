import React from "react";
import { Drawer, List, ListItem, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";

import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAddTask } from "react-icons/md";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  handleDrawerToggle,
}) => {
  const location = useLocation();
  const active = (path: string) => location.pathname === path;
  const drawer = (
    <div>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          color: "black",
          p: 2,
        }}
      >
        {" "}
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 400,
            fontSize: "25px",
            color: "#464255",
          }}
        >
          logo
        </Typography>
      </Box>
      <List sx={{ mt: 2 }}>
        <ListItem
          component={Link}
          to="/dashboard"
          onClick={handleDrawerToggle}
          sx={{
            width: "100%",
            justifyContent: "center",

            py: 2,
          }}
        >
          {/* <ListItemText primary="Home" /> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 5,

              alignItems: "center",
              color: "black",
              width: "100%",
            }}
          >
            <GoHome
              style={{
                fontSize: "25px",
                color: active("/dashboard") ? "#59B2E8" : "",
              }}
            />
            <span
              style={{
                color: active("/dashboard") ? "#59B2E8" : "",
                fontWeight: 400,
                fontSize: "15px",
              }}
            >
              Dashboard
            </span>
          </Box>
        </ListItem>
        <ListItem
          component={Link}
          to="/task"
          onClick={handleDrawerToggle}
          sx={{
            width: "100%",
            justifyContent: "center",
            py: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 5,

              alignItems: "center",
              color: "black",
              width: "100%",
            }}
          >
            <MdOutlineAddTask
              style={{
                fontSize: "25px",
                color: active("/task") ? "#59B2E8" : "",
              }}
            />
            <span
              style={{
                // color: "black",
                fontWeight: 400,
                fontSize: "15px",
                color: active("/task") ? "#59B2E8" : "",
              }}
            >
              Tasks
            </span>
          </Box>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "#FFFFFF",
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          background: "red",
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "#FFFFFF",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
