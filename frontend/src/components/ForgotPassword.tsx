import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { styled } from "@mui/material/styles";

interface StatusState {
  type: "success" | "error" | null;
  message: string;
}

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<StatusState>({
    type: null,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(API_ROUTES.FORGOT_PASSWORD, { email });
      setStatus({
        type: "success",
        message:
          "If an account exists with this email, you will receive password reset instructions.",
      });
      setEmail("");
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>

      {status.type && (
        <Alert severity={status.type} sx={{ mt: 2, width: "100%" }}>
          {status.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          margin="normal"
        />
        <SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
        >
          {loading ? "Sending..." : "Reset Password"}
        </SubmitButton>
      </Box>
    </StyledContainer>
  );
};
