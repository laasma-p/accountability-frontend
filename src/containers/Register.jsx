import { Formik, Form } from "formik";
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required.")
    .matches(/^\S*$/, "First name must not contain spaces."),
  email: Yup.string()
    .email("Invalid e-mail format.")
    .required("E-mail is required.")
    .matches(/^\S*$/, "E-mail must not contain spaces."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required.")
    .matches(/^\S*$/, "Password must not contain spaces."),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match.")
    .required("Repeating password is required."),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerHandler = (values) => {
    axios
      .post("http://localhost:3000/api/register", values)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "3rem", sm: "4rem" },
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Register
      </Typography>
      <Formik
        initialValues={{
          firstName: "",
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={registerHandler}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => {
          return (
            <Form style={{ width: "100%", maxWidth: "400px" }}>
              <Box sx={{ marginBottom: 3 }}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ marginBottom: "24px" }}
                />
                <TextField
                  fullWidth
                  name="email"
                  label="E-mail"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ marginBottom: "24px" }}
                />
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ marginBottom: "24px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  name="repeatPassword"
                  label="Repeat Password"
                  type="password"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repeatPassword}
                  error={
                    touched.repeatPassword && Boolean(errors.repeatPassword)
                  }
                  helperText={touched.repeatPassword && errors.repeatPassword}
                  sx={{ marginBottom: "24px" }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: "10px 20px",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  Register
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Register;
