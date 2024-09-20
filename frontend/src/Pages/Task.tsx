import { Box, Typography } from "@mui/material";
import React from "react";
import AddTaskBox from "../components/Tasks/addTaskBox";
import TabView from "../components/Tasks/tabView";

export default function Task() {
  return (
    <>
      <Box>
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
              fontWeight: 400,
              fontSize: "25px",
              color: "#464255",
            }}
          >
            Manage Task
          </Typography>
          <span
            style={{ color: "#A3A3A3", marginTop: "5px", fontSize: "13px" }}
          >
            Check Your daily Tasks and Schedule
          </span>
        </Box>

        <Box>
          <AddTaskBox />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TabView />
        </Box>
      </Box>
    </>
  );
}
