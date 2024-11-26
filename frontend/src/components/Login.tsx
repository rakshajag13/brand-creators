import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Typography, Container, Box, Grid2 } from "@mui/material";
import { styled } from '@mui/material/styles';
import { LoginData } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const Root = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

const FormContainer = styled(Box)({
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string()
});

export const Login: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
        defaultValues: { email: "", password: "" }
    });
    const { login: loginUser, isLoggedIn } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/contacts');
        }
    }, [isLoggedIn, navigate]);
    const onSubmit = async (data: LoginData) => {
        console.log(data)
        const { error: loginError, data: user } = await loginUser(data);
        if (loginError && !user) {

            setErrorMessage(loginError);
            return;
        }
        navigate('/contacts');
    };


    return (
        <Root>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormContainer>
                    <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                        Login
                    </Typography>

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                {...field}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                {...field}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                    {errorMessage && (
                        <Typography variant="body1" color="error" gutterBottom>
                            {errorMessage}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Login
                    </Button>
                    <Grid2 container justifyContent="center" display={"flex"} alignItems={"center"}>
                        <Link to="/forgot-password" style={{ "textDecoration": "none", "color": "#007BFF" }}>
                            Forgot Password ?
                        </Link>
                    </Grid2>

                    <Grid2 container justifyContent="center" display={"flex"} alignItems={"center"}>
                        <Typography variant="subtitle1">
                            Don't have an account?
                        </Typography>
                        <Grid2 sx={{ marginLeft: '0.5rem' }}>
                            <Link to="/register" style={{ "textDecoration": "none", "color": "#007BFF" }}>
                                Signup
                            </Link>
                        </Grid2>
                    </Grid2>
                </FormContainer>
            </form>
        </Root>
    );
};
