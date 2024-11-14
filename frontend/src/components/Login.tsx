import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Typography, Grid, Container, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { LoginData, RegisterData } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

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
    const { login: loginUser } = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (data: LoginData) => {
        console.log(data)
        await loginUser(data);
        navigate('/Home');
    };

    return (
        <Root>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormContainer>
                    <Typography variant="h5" textAlign="center" gutterBottom>
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

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: '1rem' }}
                    >
                        Submit
                    </Button>
                </FormContainer>
            </form>
        </Root>
    );
};
