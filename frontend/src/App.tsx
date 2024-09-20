import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import Sidebar from "./Pages/sidebar";
import { useEffect, useState } from "react";
import Navbar from "./Pages/navbar";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Dashboard from "./Pages/dashboard";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Task from "./Pages/Task";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   if (!token && window.location.pathname !== "/signup") {
  //     navigate("/"); // Redirect to login if token is missing
  //   }
  // }, [navigate]);
  const drawerWidth = 240;
  const isSignupPage =
    window.location.pathname === "/signup" ||
    window?.location?.pathname === "/";

  return (
    // <GlobalProvider>
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#dbd9de",
      }}
    >
      <ToastContainer />

      {!isSignupPage && (
        <>
          <Navbar handleDrawerToggle={handleDrawerToggle} />
          <Sidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,

          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflowY: "auto",
          height: "calc(100vh - 64px)",
        }}
      >
        {/* <Container> */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<Task />} />
        </Routes>
        {/* </Container> */}
      </Box>
    </Box>
    // </GlobalProvider>
  );
}

export default App;
