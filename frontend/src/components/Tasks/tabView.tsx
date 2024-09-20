import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TaskDetails from "./taskDetails";
import { getAllTask } from "../services/Services";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel -$ {index}`}
      aria-label={`sample-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.protoTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

interface Task {
  id: number; // Adjust if your ID is a string or number
  title: string;
  descriptions: string;
  created: string;
  _id: string;
  priority: string;
  Completed: boolean;
}

export default function TabView() {
  const [value, setValue] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const handleChange = (e: any, newValue: any) => {
    setValue(newValue);
  };
  const [allTask, setAllTask] = useState<Task[]>([]);
  console.log("🚀 ~ TabView ~ allTask:", allTask);

  const fetchTask = async () => {
    try {
      setLoading(true);
      await getAllTask()
        .then((res) => {
          const data = res.data;

          setAllTask(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTask();
  }, [setAllTask]);
  const filterdTask = allTask.filter((item) => item.Completed === true);
  console.log("🚀 ~ TabView ~ filterdTask:", filterdTask);
  return (
    <div>
      <Box sx={{}}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          sx={{
            borderRadius: "10px",

            paddingY: "12px",

            backgroundColor: "#59B2E8",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
            "& .MuiTabs-flexContainer": {
              justifyContent: "left",
              textTransform: "none !important",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "transparent",
            },
            "& .MuiTab-root.Mui-selected": {
              borderRadius: "12px",
              color: "#FFF",
              fontWeight: "bold",
            },
            "& .MuiTab-root": {
              textTransform: "none !important",
              fontSize: "16px",
              lineHeight: "14px",
              color: "white",
            },
          }}
        >
          <Tab label="Created (06)" {...a11yProps(0)}></Tab>

          <Tab label="Completed (06)" {...a11yProps(1)}></Tab>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TaskDetails allTask={allTask} fetchTask={fetchTask} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <TaskDetails allTask={filterdTask} fetchTask={fetchTask} />
      </TabPanel>
    </div>
  );
}
