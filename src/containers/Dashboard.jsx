import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">Accountable</Typography>
      <Box>
        <Typography variant="body1">Dashboard will be here.</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
