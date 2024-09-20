import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { AddIcon } from "../../icons/addIcon";
import CustomAddDialogBox from "./customAddDialogBox";

export default function AddTaskBox() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const fetchTask = () => {};
  return (
    <div>
      <Box
        sx={{
          display: { sm: "block", md: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
          border: 1,
          borderRadius: 3,
          borderColor: "white",
          background: "#F8F8F8",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "right",
            display: "flex",
            flexDirection: "column",
            color: "black",
            p: 2,
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              color: "#464255",
            }}
          >
            Today's Task
          </Typography>
          <span
            style={{ color: "#A3A3A3", marginTop: "5px", fontSize: "13px" }}
          >
            Check Your daily Tasks and Schedule
          </span>
          <Button
            variant="contained"
            sx={{
              background: "#59B2E8",
              p: 1.5,
            }}
            onClick={() => setOpen(true)}
          >
            {" "}
            Add New{" "}
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "6px",
              }}
            >
              <AddIcon />
            </span>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <img
            src="/images/image 45.png"
            alt="Add"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Box>
      <CustomAddDialogBox
        open={open}
        setOpen={setOpen}
        // handleClose={handleClose}
        Edit={false}
        _id={""}
        setSelectedId={setSelectedId}
        fetchTask={fetchTask}
      />
    </div>
  );
}
