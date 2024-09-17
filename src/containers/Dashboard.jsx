import { Box, Typography, List, ListItem } from "@mui/material";
import Calendar from "./Calendar";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [trackedHabits, setTrackedHabits] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDate = async () => {
      const today = new Date().toISOString().split("T")[0];
      setCurrentDate(new Date(today));

      try {
        const response = await axios.get(
          `http://localhost:3000/api/habits/date/${today}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTrackedHabits(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDate();
  }, [token]);

  const fetchTrackedHabits = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/habits/date/${date}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDateSelect = async (date) => {
    try {
      const habits = await fetchTrackedHabits(date);
      if (Array.isArray(habits)) {
        setTrackedHabits(habits);
      } else {
        console.error(error.message);
      }
    } catch (error) {
      console.error(error.message);
    }
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
        Dashboard
      </Typography>
      <Box>
        <Calendar onDateSelect={handleDateSelect} />
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Today's habits:</Typography>
          {Array.isArray(trackedHabits) && trackedHabits.length > 0 ? (
            <List>
              {trackedHabits.map((habit) => {
                return (
                  <ListItem
                    sx={{ display: "flex", justifyContent: "center" }}
                    key={habit.id}
                  >
                    {habit.name}
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              No habits tracked.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
