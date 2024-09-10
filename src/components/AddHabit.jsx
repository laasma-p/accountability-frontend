import { Formik, Form } from "formik";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as Yup from "yup";
import axios from "axios";
import { AddCircle, CheckCircle } from "@mui/icons-material";
import { useState, useEffect } from "react";

const AddHabitSchema = Yup.object().shape({
  name: Yup.string().required("Please enter a habit."),
});

const AddHabit = () => {
  const [userHabits, setUserHabits] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/habits", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserHabits(response.data);
      })
      .catch((error) => {
        console.error(error.response?.data || error.message);
      });
  }, [token]);

  const predefinedHabits = ["Exercise", "Read", "Meditate", "Journal"];

  const addHabitHandler = (values) => {
    const habitData = typeof values === "string" ? { name: values } : values;

    axios
      .post("http://localhost:3000/api/habits", habitData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserHabits((prevUserHabits) => [...prevUserHabits, response.data]);
      })
      .catch((error) => {
        console.error(error.response?.data || error.message);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: "1rem", sm: "2rem" },
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "2rem",
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        Manage your habits
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        Start with some already pre-defined...
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {predefinedHabits.map((habit) => {
          return (
            <Grid xs={12} sm={6} md={3} key={habit}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<CheckCircle />}
                onClick={() => addHabitHandler(habit)}
                sx={{
                  padding: "10px",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  textTransform: "none",
                }}
              >
                {habit}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ marginY: "2rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          or add your own:
        </Typography>
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
      <Box sx={{ width: "100%", maxWidth: "600px", marginY: "2rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          Added habits
        </Typography>
        <List>
          {userHabits.map((userHabit) => {
            return (
              <Box key={userHabit.id}>
                <ListItem sx={{ paddingY: "0.5rem" }}>
                  <ListItemText primary={userHabit.name} />
                </ListItem>
                <Divider />
              </Box>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default AddHabit;
