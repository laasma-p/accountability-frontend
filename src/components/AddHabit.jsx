import { Formik, Form } from "formik";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { AddCircle } from "@mui/icons-material";

const AddHabitSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a habit."),
});

const AddHabit = () => {
  const token = localStorage.getItem("token");

  const addHabitHandler = (values) => {
    axios
      .post("http://localhost:3000/api/habits", values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log("The habit is added.");
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
      }}
    >
      <Typography variant="h6">Add a habit</Typography>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={AddHabitSchema}
        onSubmit={addHabitHandler}
      >
        {({ handleChange, handleBlur, values, touched, errors }) => {
          return (
            <Form style={{ width: "100%", maxWidth: "400px" }}>
              <TextField
                fullWidth
                name="name"
                label="Habit Name"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <AddCircle color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddHabit;
