import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Dashboard = ({ toggleTheme, switchMode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Accountable
          </Typography>
          <Tooltip
            title={switchMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <IconButton color="inherit" onClick={toggleTheme}>
              {switchMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box>
        <Typography variant="body1">Dashboard will be here.</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
