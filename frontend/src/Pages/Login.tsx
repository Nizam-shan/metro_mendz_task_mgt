import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../components/services/Services";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Login() {
  const initialValues = { email: "", password: "" };

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (setSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    setLoading(true);
    LoginService(values)
      .then((res) => {
        const data = res.data;
        setLoading(false);

        if (data.status_code === 200) {
          localStorage.setItem("access_token", data?.data?.userDetails?.token);
          localStorage.setItem(
            "name",
            data?.data?.userDetails?.user?.first_name
          );

          localStorage.setItem(
            "profile",
            data?.data?.userDetails?.user?.profile_image
          );

          //   navigate("/dashboard");
          window.location.replace("/dashboard");
          toast.success(data?.message || "Login sucessfull");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ handleSubmit ~ err:", err);
        setLoading(false);

        toast.error(
          err?.response?.data?.message ||
            "Some error occurred. Please try again"
        );
      });
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {isLoading === true && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          border: 1,
          borderColor: "#5C218B",
          borderRadius: "10px",
          display: "flex",

          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "black", p: 3, fontWeight: "bold" }}
          >
            L o g I n
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, values, touched, errors }) => (
            <Form>
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                autoComplete="off"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                  mb: 3,
                }}
                InputProps={{ sx: { borderRadius: 3, color: "#818181" } }}
              />
              <TextField
                margin="dense"
                name="password"
                label="Password"
                autoComplete="off"
                type="password"
                fullWidth
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
                  mb: 3,
                }}
                InputProps={{ sx: { borderRadius: 3, color: "#818181" } }}
              />
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                sx={{
                  textTransform: "none",
                  mt: 2,
                  background: "#5C218B",
                  borderRadius: 2,
                }}
              >
                Login
              </Button>
              <p>
                Don't have an account ?{" "}
                <span
                  style={{
                    color: "#227cf2",
                    cursor: "pointer",

                    borderRadius: 2,
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
