import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { styled } from '@mui/material/styles';
import { Box, Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { BrandSignupData } from "types/brandSignup";
import { useAuth } from "context/AuthContext";

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
    padding: '3rem',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
});

export const brandSignupSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    industry: z.string(),
    website: z.string(),
    businessType: z.string(),
    phone: z.string().optional(),
    domain: z.string(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED']).optional(),
});

const domains = [{
    domain: "abc.com", id: 1
}]
const fields = [
    { name: 'email', label: 'Email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'companyName', label: 'Company Name' },
    { name: 'industry', label: 'Industry' },
    { name: 'website', label: 'Website' },
    { name: 'businessType', label: 'Business Type' },
    { name: 'phone', label: 'Phone' },
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export const BrandSignup: React.FC = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<BrandSignupData>({
        resolver: zodResolver(brandSignupSchema),
        mode: "onSubmit",
        defaultValues: { email: "", password: "", companyName: "", industry: "", website: "", businessType: "", phone: "", domain: "abc.com" }
    });
    const navigate = useNavigate();
    const { brandSignup: signedupUser } = useAuth();
    const onSubmit = async (data: BrandSignupData) => {
        await signedupUser(data);
        navigate('/Home');
    };


    return (
        <Root>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormContainer>
                    <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                        Brand Signup
                    </Typography>

                    {fields.map((field) => (
                        <Controller
                            key={field.name}
                            name={field.name as "email" | "password" | "companyName" | "industry" | "website" | "businessType" | "phone"}
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextField
                                    label={field.label}
                                    variant="outlined"
                                    fullWidth
                                    type={field.type}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={!!errors[field.name as keyof BrandSignupData]}
                                    helperText={errors[field.name as keyof BrandSignupData]?.message}
                                />
                            )}
                        />
                    ))}
                    <Controller
                        key='domain'
                        name='domain'
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={value}
                                onChange={onChange}
                                //input={<OutlinedInput label="Domain" />}
                                MenuProps={MenuProps}
                            >
                                {domains.map((domain) => (
                                    <MenuItem
                                        key={domain.id}
                                        value={domain.domain}
                                    >
                                        {domain.domain}
                                    </MenuItem>
                                ))}
                            </Select>

                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: '0.5rem' }}
                    >
                        Signup
                    </Button>
                </FormContainer>
            </form>
        </Root>
    )
}