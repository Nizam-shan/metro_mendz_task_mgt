import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { TotalTaskIcon } from "../../icons/totalTaskIcon";
import { CompletedIcon } from "../../icons/completeedIcon";
import { getAllTask } from "../services/Services";

interface Task {
  id: number; // Adjust if your ID is a string or number
  title: string;
  descriptions: string;
  created: string;
  _id: string;
  priority: string;
  Completed: boolean;
}

const DashboardMain: React.FC = () => {
  const [allTask, setAllTask] = useState<Task[]>([]);

  const fetchTask = async () => {
    try {
      await getAllTask()
        .then((res) => {
          const data = res.data;

          setAllTask(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTask();
  }, [setAllTask]);
  const filterdTask = allTask.filter((item) => item.Completed === true);
  return (
    <>
      <Box sx={{ mt: 3, display: "flex", gap: 3 }}>
        <Box
          sx={{
            width: "20%",
            height: "auto",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: "#464255" }}>Total Tasks</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {allTask?.length}
            </Typography>
          </Box>
          <Box>
            <TotalTaskIcon sx={{ width: "40px", height: "auto" }} />
          </Box>
        </Box>

        <Box
          sx={{
            width: "20%",
            height: "auto",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: "#464255" }}>Completed</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {" "}
              {filterdTask?.length}
            </Typography>
          </Box>
          <Box>
            <CompletedIcon sx={{ width: "40px", height: "auto" }} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardMain;
