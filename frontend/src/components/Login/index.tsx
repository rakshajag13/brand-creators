import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Typography, Grid2 } from "@mui/material";
import { LoginData } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Root, FormContainer } from "./Login.styles";
import { LoginFormField } from "./LoginFormField";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Login: React.FC = () => {
  const { control, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const { login: loginUser, isLoggedIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/contacts");
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (data: LoginData) => {
    try {
      setErrorMessage(null);
      const { error: loginError, data: user } = await loginUser(data);

      if (loginError && !user) {
        setErrorMessage(loginError);
        return;
      }

      navigate("/contacts");
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Root>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
          >
            Login
          </Typography>

          <LoginFormField name="email" control={control} label="Email" />

          <LoginFormField
            name="password"
            control={control}
            label="Password"
            type="password"
          />

          {errorMessage && (
            <Typography variant="body1" color="error" gutterBottom>
              {errorMessage}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>

          <Grid2 container justifyContent="center" alignItems="center">
            <Link
              to="/forgot-password"
              style={{ textDecoration: "none", color: "#007BFF" }}
            >
              Forgot Password?
            </Link>
          </Grid2>

          <Grid2 container justifyContent="center" alignItems="center">
            <Typography variant="subtitle1">Don't have an account?</Typography>
            <Grid2 sx={{ marginLeft: "0.5rem" }}>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#007BFF" }}
              >
                Signup
              </Link>
              /
              <Link
                to="/brand-signup"
                style={{ textDecoration: "none", color: "#007BFF" }}
              >
                Brand Signup
              </Link>
            </Grid2>
          </Grid2>
        </FormContainer>
      </form>
    </Root>
  );
};
