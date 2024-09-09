import { Box, Typography } from "@mui/material";

const AddHabit = () => {
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
      <Box>
        <Typography variant="body1">
          Adding habits, and seeing them will be here.
        </Typography>
      </Box>
    </Box>
  );
};

export default AddHabit;
