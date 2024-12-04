import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  // Access the MUI theme for potential theme-related functionalities.
  const theme = useTheme();

  // TODO: Extract login function and error from our authentication context.
  const { loginError, login, register } = useAuth();

  // State to hold the username and password entered by the user.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // TODO: Handle login function.
  const handleLogin = () => {
    if (isRegisterMode) {
      register(username, password);
    } else {
      login(username, password);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            marginBottom: 2,
            height: 200,
            width: 200,
          }}
          alt="UT Longhorn"
          src="/longhorn.jpg"
        ></Box>
        <Typography component="h1" variant="h4" fontWeight="bold">
          {isRegisterMode ? "Register" : "Login"} {/* Toggle Heading */}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            InputLabelProps={{ shrink: true }}
            placeholder="example@example.com"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            InputLabelProps={{ shrink: true }}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            {isRegisterMode ? "Register" : "Login"} {/* Toggle Button */}
          </Button>
          <Button
            fullWidth
            color="secondary"
            sx={{ mt: 1 }}
            onClick={() => setIsRegisterMode((prev) => !prev)} // Toggle between modes
          >
            {isRegisterMode
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Button>
        </Box>
        {/* TODO: Display Login Error if it exists */}
        {loginError && (
          <Alert severity="error">
            {loginError}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default LoginPage;
