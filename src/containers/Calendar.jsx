import { useState, useEffect } from "react";
import { Box, Paper, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// Array of day names starting from Monday
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Calendar = ({ onDateSelect }) => {
  // State to hold the current date and currently selected date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Convert to UTC date and format it as YYYY-MM-DD
    const formattedDate = selectedDate.toISOString().split("T")[0];
    onDateSelect(formattedDate);
  }, [selectedDate]);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Setting time to midnight

  // Getting the first day of the current month
  const startOfMonth = new Date(
    Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1)
  );

  // Getting the day of the week of the first day of the month
  // Adjusting to start the week on Monday (0 = Sunday, 1 = Monday and so on and so forth)
  const startDay = (startOfMonth.getUTCDay() + 6) % 7;

  // Get the last day of the current month
  const endOfMonth = new Date(
    Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 0)
  );

  // Total number of days in the current month
  const totalDays = endOfMonth.getUTCDate();

  // Array to hold all the days to be displayed in the calendar
  const daysArray = [];

  // Fill in the days of the previous month
  const previousMonthEnd = new Date(
    Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 0)
  );

  const previousMonthDays = previousMonthEnd.getUTCDate();

  for (let i = startDay - 1; i >= 0; i--) {
    daysArray.push({
      day: previousMonthDays - i,
      isCurrentMonth: false,
      isDisabled: true,
      isPast: false,
      isNextMonth: false,
    });
  }

  // Fill in the days of the current month
  for (let i = 1; i <= totalDays; i++) {
    const dayDate = new Date(
      Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), i)
    );

    daysArray.push({
      day: i,
      isCurrentMonth: true,
      isDisabled: dayDate < today, // Disable if the date is before the current date
      isPast: dayDate < today, // Mark a date as past date if the date is before today
      isNextMonth: false,
      isToday: dayDate.toDateString() === today.toDateString(), // Check if the date is today's date
    });
  }

  // Calculate how many days are needed to complete the last week
  const totalCells = 42;
  const daysInLastWeek = (totalCells - daysArray.length) % 7;
  const daysFromNextMonth = daysInLastWeek > 0 ? daysInLastWeek : 0;

  // Add days from the next month only if needed
  for (let i = 1; i <= daysFromNextMonth; i++) {
    daysArray.push({
      day: i,
      isCurrentMonth: false,
      isDisabled: true,
      isPast: false,
      isNextMonth: true,
    });
  }

  const handleClick = (day) => {
    if (day.isDisabled) {
      return;
    }

    const newDate = new Date(
      Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), day.day)
    );

    setSelectedDate(newDate);
  };

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
              new Date(
                Date.UTC(
                  currentDate.getUTCFullYear(),
                  currentDate.getUTCMonth() - 1
                )
              )
            )
          }
        >
          Prev
        </Button>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getUTCFullYear()}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<ArrowForward />}
          onClick={() =>
            setCurrentDate(
              new Date(
                Date.UTC(
                  currentDate.getUTCFullYear(),
                  currentDate.getUTCMonth() + 1
                )
              )
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
        {daysArray.map(
          (
            { day, isCurrentMonth, isDisabled, isPast, isNextMonth, isToday },
            index
          ) => {
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
                    backgroundColor: isCurrentMonth
                      ? isToday
                        ? "primary.main"
                        : isPast
                        ? "action.disabled.past"
                        : "background.paper"
                      : isNextMonth
                      ? "action.disabled.nextMonth"
                      : "action.disabled.previousMonth",
                    color: isCurrentMonth
                      ? isToday
                        ? "background.paper"
                        : isPast
                        ? "text.disabled"
                        : "text.primary"
                      : "text.disabled",
                    cursor:
                      isCurrentMonth && !isDisabled ? "pointer" : "not-allowed",
                  }}
                  elevation={1}
                  onClick={() => handleClick({ day, isDisabled })}
                >
                  <Typography variant="body1">{day}</Typography>
                </Paper>
              </Grid>
            );
          }
        )}
      </Grid>
    </Box>
  );
};

export default Calendar;
