import { Formik, Form } from "formik";
import { Box, TextField, Typography, Button } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid e-mail format.")
    .required("E-mail is required.")
    .matches(/^\S*$/, "E-mail must not contain spaces."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/^\S*$/, "Password must not contain spaces."),
});

const Login = () => {
  const navigate = useNavigate();

  const loginHandler = (values) => {
    axios
      .post("http://localhost:3000/api/login", values)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
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
        Login
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={loginHandler}
      >
        {({ handleChange, values }) => {
          return (
            <Form style={{ width: "100%", maxWidth: "400px" }}>
              <Box sx={{ marginBottom: 3 }}>
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
                  Log In
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Login;
