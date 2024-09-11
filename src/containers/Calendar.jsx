import { useState } from "react";
import { Box, Paper, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// Array of day names starting from Monday
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Calendar = () => {
  // State to hold the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Getting the first day of the current month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Getting the day of the week of the first day of the month
  // Adjusting to start the week on Monday (0 = Sunday, 1 = Monday and so on and so forth)
  const startDay = (startOfMonth.getDay() + 6) % 7;

  // Get the last day of the current month
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Total number of days in the current month
  const totalDays = endOfMonth.getDate();

  // Array to hold all the days to be displayed in the calendar
  const daysArray = [];

  // Fill in the days of the previous month
  const previousMonthEnd = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  const previousMonthDays = previousMonthEnd.getDate();

  for (let i = startDay - 1; i >= 0; i--) {
    daysArray.push(previousMonthDays - i);
  }

  // Fill in the days of the current month
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i);
  }

  // Calculate how many days are needed to complete the last week
  const totalCells = 42;
  const daysInLastWeek = (totalCells - daysArray.length) % 7;
  const daysFromNextMonth = daysInLastWeek > 0 ? daysInLastWeek : 8;

  // Add days from the last month only if needed
  for (let i = 1; i <= daysFromNextMonth; i++) {
    daysArray.push(i);
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingY: 2,
          paddingX: 0.5,
          marginBottom: 2,
          borderRadius: 2,
          backgroundColor: "background.paper",
          boxShadow: 3,
        }}
        elevation={3}
      >
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ArrowBack />}
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            )
          }
        >
          Prev
        </Button>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<ArrowForward />}
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            )
          }
        >
          Next
        </Button>
      </Paper>
      <Grid
        container
        spacing={1}
        sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}
      >
        {days.map((day) => {
          return (
            <Grid key={day}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "secondary.light",
                  borderRadius: 2,
                  boxShadow: 1,
                  padding: 1,
                }}
                elevation={1}
              >
                <Typography variant="body1">{day}</Typography>
              </Paper>
            </Grid>
          );
        })}
        {daysArray.map((day, index) => {
          return (
            <Grid key={index}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: 1,
                  padding: 2,
                }}
                elevation={1}
              >
                <Typography variant="body1">{day}</Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Calendar;
