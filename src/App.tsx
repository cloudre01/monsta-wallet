import React from "react";
import "./App.css";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Swap from "./components/Swap";

function App() {
  return (
    <div className="App">
      <Box
        sx={{
          backgroundColor: "#fff5f0",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography align="center" mb={4} color="black" variant="h4">
          Welcome to the MonstaInfinite Token Exchange
        </Typography>
        <Swap />
      </Box>
    </div>
  );
}

export default App;
