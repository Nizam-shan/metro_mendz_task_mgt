import {
  Avatar,
  Box,
  Button,
  Grid2,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CustomAddDialogBox from "./customAddDialogBox";
import { deleteTask } from "../services/Services";
import { toast } from "react-toastify";

interface Task {
  id: number;
  title: string;
  descriptions: string;
  created: string;
  _id: string;
  priority: string;
}
interface TaskDetailsProps {
  allTask: Task[];
  fetchTask: () => void;
}

export default function TaskDetails({ allTask, fetchTask }: TaskDetailsProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedId, setSelectedId] = useState<string | string>("");
  console.log("🚀 ~ TaskDetails ~ selectedId:", selectedId);
  const handleClick = (event: React.MouseEvent<SVGElement>, id: string) => {
    setSelectedId(id);
    setAnchorEl(event.target as HTMLElement);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDailog = () => {
    setOpenDialog(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDailogOpen = () => {
    // console.log("🚀 ~ handleDailogOpen ~ id:", id);
    // setSelectedId(id);
    setOpenDialog(true);
  };
  // const tasks = [
  //   {
  //     id: 1,
  //     title: "5 Client follow up for tomorrow",
  //     details: "5 Client follow up needs to be done.",
  //     date: "12/05/2024",
  //     assignedTo: "nizam",
  //     role: "manager",
  //     priority: "Low",
  //   },
  //   // Add more tasks here
  //   {
  //     id: 2,
  //     title: "Task Title 2",
  //     details: "Task details 2.",
  //     date: "12/06/2024",
  //     assignedTo: "john",
  //     role: "developer",
  //     priority: "Medium",
  //   },
  // ];
  const handleDelete = async () => {
    try {
      await deleteTask(selectedId)
        .then((res) => {
          fetchTask();
          toast.success(res.data?.message);
        })
        .catch((error) => {
          console.log("error", error);
          toast.error(error.response.data.message || "Some error occured");
        });
    } catch (error) {
      toast.error("Some error occured");
    }
  };
  return (
    <div>
      <Grid2 container spacing={2} sx={{ p: 2, mb: 3 }}>
        {allTask.map((task, index) => (
          <Grid2 size={4} key={index} sx={{ py: 4 }}>
            <Box
              sx={{
                background: "#FFFFFF",
                borderRadius: 3,
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ color: "#004490" }}>
                    {task.title}
                  </Typography>
                  <Typography
                    sx={{ color: "#B9BBBD", mt: -2 }}
                    component="div"
                    dangerouslySetInnerHTML={{ __html: task.descriptions }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <BsThreeDots
                    style={{ color: "#464255", cursor: "pointer" }}
                    onClick={(event) => handleClick(event, task._id)}
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    <MenuItem onClick={handleDailogOpen}>Edit</MenuItem>
                  </Menu>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: 1,
                  color: "#A3A3A3",
                }}
              >
                <span>
                  <CiCalendarDate />
                </span>{" "}
                {dayjs(task.created).format("dddd, DD MMM YYYY")}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box>
                    <Avatar
                      src={`${process.env.REACT_APP_API}${localStorage.getItem(
                        "profile"
                      )}`}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ color: "#A3A3A3" }}>
                      By {localStorage.getItem("name")}
                    </Typography>
                    <Typography sx={{ color: "#A3A3A3" }}>Manager</Typography>
                  </Box>
                </Box>
                <Box>
                  <span style={{ color: "#004490", marginRight: "8px" }}>
                    Priority
                  </span>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      color: "#fff",
                      background:
                        task?.priority === "Low"
                          ? "#00BFA1"
                          : task.priority === "High"
                          ? "#FF807A"
                          : "#EBAF00",
                    }}
                  >
                    {task.priority}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
      <CustomAddDialogBox
        open={openDialog}
        setOpen={setOpenDialog}
        // handleClose={handleCloseDailog}
        Edit={true}
        _id={selectedId}
        setSelectedId={setSelectedId}
        fetchTask={fetchTask}
      />
    </div>
  );
}

{
  /* <Box sx={{ background: "#FFFFFF", borderRadius: 3, p: 3, width: "40%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography>5 Client follow up for tomorrow</Typography>
            <Typography>
              Details: 5 Client follow up needs to be done.
            </Typography>
          </Box>
          <Box>123</Box>
        </Box>
        <Box>date:12/85/20222</Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography>nizam</Typography>
            <Typography>manger</Typography>
          </Box>
          <Box>
            Prioty
            <Button variant="contained">Low</Button>
          </Box>
        </Box>
      </Box> */
}
