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
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import * as Yup from "yup";
import axios from "axios";
import { AddCircle, CheckCircle, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";

const AddHabit = () => {
  const [userHabits, setUserHabits] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/habits", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setUserHabits([]);
        } else {
          setUserHabits(response.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to load habits.");
        setSnackbarOpen(true);
        setLoading(false);
      });
  }, [token]);

  const predefinedHabits = ["Exercise", "Read", "Meditate", "Journal"];

  const AddHabitSchema = Yup.object().shape({
    name: Yup.string()
      .required("Please enter a habit.")
      .min(3, "Habit must have at least 3 characters.")
      .max(50, "Habit cannot exceed 50 characters.")
      .test("unique-habit", "Habit is already added.", (value) => {
        if (!value) {
          return true;
        }

        return (
          !userHabits.some(
            (habit) => habit.name.toLowerCase() === value.toLowerCase()
          ) &&
          !predefinedHabits.some(
            (habit) => habit.toLowerCase() === value.toLowerCase()
          )
        );
      }),
  });

  const addHabitHandler = (values) => {
    const habitData = typeof values === "string" ? { name: values } : values;

    axios
      .post("http://localhost:3000/api/habits", habitData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserHabits((prevUserHabits) => [...prevUserHabits, response.data]);
        setSnackbarSeverity("success");
        setSnackbarMessage("Habit added successfully!");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to add the habit.");
        setSnackbarOpen(true);
      });
  };

  const deleteHabitHandler = (id) => {
    axios
      .delete(`http://localhost:3000/api/habits/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUserHabits((prevUserHabits) =>
          prevUserHabits.filter((habit) => habit.id !== id)
        );
        setSnackbarSeverity("success");
        setSnackbarMessage("Habit deleted successfully!");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to delete the habit.");
        setSnackbarOpen(true);
      });
  };

  const trackHabitHandler = (id) => {
    axios
      .post(`http://localhost:3000/api/habits/${id}/track`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserHabits((prevUserHabits) =>
          prevUserHabits.map((habit) =>
            habit.id === id ? response.data : habit
          )
        );
        setSnackbarSeverity("success");
        setSnackbarMessage("Habit is started to be tracked.");
        setSnackbarOpen(true);
      })
      .catch(() => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to start tracking the habit.");
        setSnackbarOpen(true);
      });
  };

  const snackbarCloseHandler = () => {
    setSnackbarOpen(false);
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
          const isHabitAdded = userHabits.some(
            (userHabit) => userHabit.name.toLowerCase() === habit.toLowerCase()
          );
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
                disabled={loading || isHabitAdded}
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
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={addHabitHandler}
        >
          {({ handleChange, handleBlur, values, touched, errors }) => {
            const isPredefinedHabit = predefinedHabits.some(
              (habit) =>
                habit.toLowerCase() === values.name.trim().toLowerCase()
            );

            const isHabitAlreadyAdded = userHabits.some(
              (userHabit) =>
                userHabit.name.toLowerCase() ===
                values.name.trim().toLowerCase()
            );

            const hasError =
              (touched.name && Boolean(errors.name)) ||
              isHabitAlreadyAdded ||
              isPredefinedHabit;

            let helperText = touched.name && errors.name;

            if (isPredefinedHabit && isHabitAlreadyAdded) {
              helperText = "This habit is already on the list.";
            } else if (isPredefinedHabit) {
              helperText = "Add the habit from pre-defined habits.";
            } else if (isHabitAlreadyAdded) {
              helperText = "This habit is already on the list.";
            }

            return (
              <Form style={{ width: "100%", maxWidth: "400px" }}>
                <TextField
                  fullWidth
                  name="name"
                  label="Habit Name"
                  variant="outlined"
                  color="secondary"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={hasError}
                  helperText={helperText}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          color="secondary"
                          disabled={loading}
                        >
                          <AddCircle />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  disabled={loading}
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
        {loading ? (
          <Typography>Loading habits...</Typography>
        ) : userHabits.length > 0 ? (
          <List>
            {userHabits.map((userHabit) => {
              return (
                <Box key={userHabit.id}>
                  <ListItem
                    sx={{ paddingY: "0.5rem" }}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          color="primary"
                          onClick={() => trackHabitHandler(userHabit.id)}
                        >
                          <CheckCircle />
                        </IconButton>
                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => deleteHabitHandler(userHabit.id)}
                        >
                          <Delete />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText primary={userHabit.name} />
                  </ListItem>
                  <Divider />
                </Box>
              );
            })}
          </List>
        ) : (
          <Typography>No items as of now. Add some to get started.</Typography>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={snackbarCloseHandler}
      >
        <Alert
          onClose={snackbarCloseHandler}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddHabit;
