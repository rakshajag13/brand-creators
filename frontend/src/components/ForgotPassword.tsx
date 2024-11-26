import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';

export const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('http://localhost:4000/api/auth/forgot-password', { email });
            setStatus({
                type: 'success',
                message: 'If an account exists with this email, you will receive password reset instructions.'
            });
            setEmail('');
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'An error occurred. Please try again later.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>

                {status.type && (
                    <Alert severity={status.type} sx={{ mt: 2, width: '100%' }}>
                        {status.message}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                    <TextField
                        required
                        fullWidth
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
