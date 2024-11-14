import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, TextField, Typography, Grid, Container, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { RegisterData } from "../types/auth";
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

export const registerSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    phone: z.string().optional(),
    role: z.enum(['ADMIN', 'CLIENT', 'CREATOR']),
});

export const Register: React.FC = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
        defaultValues: { email: "", password: "", firstName: "", lastName: "", phone: "", role: "CREATOR" }
    });
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (data: RegisterData) => {
        await registerUser(data);
        navigate('/Home');

    };

    return (
        <Root>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormContainer>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Register
                    </Typography>

                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                {...field}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        )}
                    />

                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                {...field}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        )}
                    />

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

                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Phone"
                                variant="outlined"
                                fullWidth
                                {...field}
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
