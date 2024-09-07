import { Formik, Form } from "formik";
import { Box, TextField, Typography, Button } from "@mui/material";

const Login = () => {
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
      >
        {() => {
          return (
            <Form style={{ width: "100%", maxWidth: "400px" }}>
              <Box sx={{ marginBottom: 3 }}>
                <TextField
                  fullWidth
                  name="email"
                  label="E-mail"
                  variant="outlined"
                  sx={{ marginBottom: "24px" }}
                />
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="passowrd"
                  variant="outlined"
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
