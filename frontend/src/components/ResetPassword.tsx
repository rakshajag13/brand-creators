import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';

export const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setStatus({
                type: 'error',
                message: 'Passwords do not match'
            });
            return;
        }

        setLoading(true);

        try {
            await axios.post(`http://localhost:4000/api/auth/reset-password?token=${token}`, { newPassword: password });
            setStatus({
                type: 'success',
                message: 'Password reset successful! Redirecting to login...'
            });
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Invalid or expired reset token. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Reset Password
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
                        label="New Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPassword;