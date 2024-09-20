import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
  TextFieldProps,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTask, editTask, getAllTaskById } from "../services/Services";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import JoditEditor from "jodit-react";
import dayjs, { Dayjs } from "dayjs";

// Convert string to Dayjs object

interface CustomAddDialogBoxProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // handleClose: () => void;
  Edit: boolean;
  _id: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  fetchTask: () => void;
}

interface Task {
  _id?: string;
  title?: string;
  descriptions?: string;
  created?: string;
  priority?: string;
  Completed: boolean;
}

export default function CustomAddDialogBox({
  setOpen,
  open,
  // handleClose,
  setSelectedId,
  Edit,
  _id,
  fetchTask,
}: CustomAddDialogBoxProps) {
  console.log("🚀 ~ Edit:", Edit);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setLoading] = useState(true);
  const editor = useRef(null);

  const [formData, setFormData] = useState<Task>({} as Task);
  let formId = _id;
  console.log("🚀 ~ formData:", _id);
  const handleClose = () => {
    setSelectedId("");
    setOpen(false);
    _id = "";
    formId = "";
  };
  console.log("🚀 ~ formId:", formId);

  const initialDate = formData.created ? dayjs(formData.created) : null;
  const fetchTaskByID = async () => {
    try {
      if (formId) {
        const response = await getAllTaskById(formId);

        setFormData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };
  useEffect(() => {
    if (Edit && formId) {
      fetchTaskByID();
    }
    //eslint-disable-next-line
  }, [Edit, formId, setFormData]);
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required").trim(),
    descriptions: Yup.string().required("Descriptionis required").trim(),
    created: Yup.string().required("Date is required").trim(),
    priority: Yup.string().required("priority is required"),
  });
  const initialValues = {
    title: formData.title || "",
    descriptions: formData.descriptions || "",
    created: formData.created || "",
    priority: formData.priority || "",

    Completed: formData.Completed ?? false,
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (setSubmitting: boolean) => void }
  ) => {
    setLoading(true);
    setSubmitting(true);
    if (Edit) {
      await editTask(values, formData._id)
        .then((res) => {
          setLoading(false);
          toast.success(res.data?.message);
          fetchTaskByID();
          handleClose();
          fetchTask();
        })
        .catch((error) => {
          toast.error(error.response.data.message || "Some error occured");
        });
    } else {
      await addTask(values)
        .then((res) => {
          console.log("ca", values);

          values.title = "";
          values.descriptions = "";
          values.created = "";

          values.priority = "";
          setOpen(false);
          fetchTask();

          setLoading(false);

          toast.success(res.data?.message);
        })
        .catch((error) => {
          console.log("🚀 ~ AddCategory ~ error:", error);

          toast.error(
            error?.response?.data?.message ||
              "Some error occurred. Please try again"
          );
          setLoading(false);
        });
    }
    console.log("🚀 ~ values:", values);
    console.log("🚀 ~ values:", values);
    setSubmitting(false);
  };

  return (
    <div>
      <Box>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={true}
          maxWidth="lg"
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="responsive-dialog-title"
            sx={{ fontWeight: "bold", fontSize: "18px" }}
          >
            {Edit ? "Edit Task" : " Create Task"}
          </DialogTitle>
          <Divider sx={{ mx: 2 }} />
          <DialogContent>
            <Box>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  isSubmitting,
                  setFieldValue,
                  handleChange,
                  values,
                  touched,
                  errors,
                }) => (
                  <Form style={{ flexGrow: 1 }}>
                    <Grid2 container spacing={8} sx={{ mt: 5, px: 3 }}>
                      <Grid2 size={12}>
                        <InputLabel sx={{ color: "#1bb7cc", fontWeight: 600 }}>
                          Task Name <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <TextField
                          margin="dense"
                          name="title"
                          type="text"
                          autoComplete="off"
                          fullWidth
                          sx={{
                            "& label.Mui-focused": {
                              color: "black",
                              fontWeight: 600,
                            },
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "black",
                              },
                            },
                          }}
                          InputProps={{
                            sx: { borderRadius: 3, color: "#818181" },
                          }}
                          value={values.title}
                          onChange={handleChange}
                          error={touched.title && Boolean(errors.title)}
                          helperText={
                            touched.title && typeof errors.title === "string"
                              ? errors.title
                              : ""
                          }
                        />
                      </Grid2>
                      <Grid2 size={12}>
                        <InputLabel sx={{ color: "#1bb7cc", fontWeight: 600 }}>
                          Details
                        </InputLabel>
                        <JoditEditor
                          ref={editor}
                          value={values.descriptions}
                          // config={config}
                          //   tabIndex={1} // tabIndex of textarea
                          onBlur={(newContent) =>
                            setFieldValue("descriptions", newContent)
                          }
                          onChange={(newContent) =>
                            setFieldValue("descriptions", newContent)
                          }
                        />
                        <p style={{ color: "#a83232" }}>
                          {touched.descriptions &&
                          typeof errors.descriptions === "string"
                            ? errors.descriptions
                            : ""}
                        </p>
                      </Grid2>
                      <Grid2 size={6}>
                        <InputLabel sx={{ color: "#1bb7cc", fontWeight: 600 }}>
                          Date <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              disablePast
                              disabled={Edit}
                              slots={{ textField: TextField }}
                              value={initialDate}
                              onChange={(date: Dayjs | null) => {
                                if (date) {
                                  const dateString = date.format("YYYY-MM-DD"); // Ensure date is in YYYY-MM-DD format
                                  setFieldValue("created", dateString); // Update Formik value
                                } else {
                                  setFieldValue("created", ""); // Handle the case when no date is selected
                                }
                              }}
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  sx: {
                                    borderRadius: 5,
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 3,
                                    },
                                  },
                                },
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        <p style={{ color: "#a83232" }}>
                          {touched.created && typeof errors.created === "string"
                            ? errors.created
                            : ""}
                        </p>
                      </Grid2>
                      <Grid2 size={6}>
                        <InputLabel sx={{ color: "#1bb7cc", fontWeight: 600 }}>
                          Priority <span style={{ color: "red" }}>*</span>
                        </InputLabel>

                        <FormControl fullWidth>
                          {/* <InputLabel>Priority</InputLabel> */}
                          <Select
                            name="priority"
                            value={values?.priority}
                            // onChange={handleChange}
                            onChange={(e) =>
                              setFieldValue("priority", e.target.value)
                            }
                            // label="status"
                            sx={{ borderRadius: 3, color: "#818181" }}
                          >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                          </Select>
                        </FormControl>
                        <p style={{ color: "#a83232" }}>
                          {touched.priority &&
                          typeof errors.priority === "string"
                            ? errors.priority
                            : ""}
                        </p>
                      </Grid2>
                      {Edit && (
                        <Grid2 size={{ lg: Edit ? 4 : 5, sm: 12 }}>
                          <InputLabel
                            sx={{ color: "#1bb7cc", fontWeight: 600 }}
                          >
                            Completed
                          </InputLabel>
                          <FormControl fullWidth>
                            <Select
                              name="Completed"
                              value={values?.Completed}
                              // onChange={handleChange}
                              onChange={(e) =>
                                setFieldValue(
                                  "Completed",
                                  e.target.value === "true"
                                )
                              }
                              sx={{ borderRadius: 3, color: "#818181" }}
                            >
                              <MenuItem value={true.toString()}>
                                Completed
                              </MenuItem>
                              <MenuItem value={false.toString()}>
                                In progress
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid2>
                      )}

                      <Grid2
                        size={12}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          p: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: 1,
                            gap: 3,
                          }}
                        >
                          <Button
                            type="submit"
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            variant="contained"
                            sx={{
                              textTransform: "none",
                              mt: 1,
                              px: 5,
                              borderRadius: 2,
                              background: "#15cf65",
                            }}
                          >
                            Submit
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            fullWidth
                            variant="outlined"
                            sx={{
                              textTransform: "none",
                              mt: 1,
                              px: 5,
                              borderRadius: 2,
                              color: "#fff",
                              borderColor: "#767676",
                              background: "#c22353",
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Grid2>
                    </Grid2>
                  </Form>
                )}
              </Formik>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
}
