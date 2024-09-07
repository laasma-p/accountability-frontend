import { Formik, Form } from "formik";
import { Box, TextField, Typography, Button } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
});

const Register = () => {
  const navigate = useNavigate();

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
        }}
        validationSchema={RegisterSchema}
        onSubmit={registerHandler}
      >
        {({ handleChange, values }) => {
          return (
            <Form style={{ width: "100%", maxWidth: "400px" }}>
              <Box sx={{ marginBottom: 3 }}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.firstName}
                  sx={{ marginBottom: "24px" }}
                />
                <TextField
                  fullWidth
                  name="email"
                  label="E-mail"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.email}
                  sx={{ marginBottom: "24px" }}
                />
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.password}
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
