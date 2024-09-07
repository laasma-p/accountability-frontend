import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
        }}
      >
        Welcome to Accountable
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          maxWidth: "600px",
        }}
      >
        Track your habits and keep yourself accountable with friends.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          marginTop: 3,
        }}
      >
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          sx={{
            width: { xs: "100%", sm: "150px" },
            padding: "10px 20px",
            fontSize: { xs: "0.875rem ", sm: "1rem" },
          }}
        >
          Log In
        </Button>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          color="secondary"
          sx={{
            width: { xs: "100%", sm: "150px" },
            padding: "10px 20px",
            fontSize: { xs: "0.875rem ", sm: "1rem" },
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;
