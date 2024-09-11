import { Box, Typography } from "@mui/material";
import Calendar from "./Calendar";

const Dashboard = () => {
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
        <Calendar />
      </Box>
    </Box>
  );
};

export default Dashboard;
