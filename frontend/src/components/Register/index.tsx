import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextField, Typography, Grid2 } from "@mui/material";
import { RegisterData } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { StyledContainer, StyledFormContainer } from "./styles";

// Form field configuration
const FORM_FIELDS = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "phone", label: "Phone", type: "text", optional: true },
] as const;

// Reusable form field component
const FormField: React.FC<{
  name: keyof RegisterData;
  control: any;
  label: string;
  type: string;
  errors: any;
}> = ({ name, control, label, type, errors }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        label={label}
        variant="outlined"
        type={type}
        fullWidth
        {...field}
        error={!!errors[name]}
        helperText={errors[name]?.message}
      />
    )}
  />
);

export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().optional(),
  role: z.enum(["ADMIN", "CLIENT", "CREATOR"]),
});

export const Register: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      role: "CREATOR",
    },
  });

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
      navigate("/Home");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <StyledFormContainer>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            sx={{
              marginBottom: "2rem",
              color: "primary.main",
            }}
          >
            Create Your Account
          </Typography>

          {FORM_FIELDS.map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              control={control}
              label={field.label}
              type={field.type}
              errors={errors}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              marginTop: "2rem",
              marginBottom: "1.5rem",
              padding: "0.8rem",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            Create Account
          </Button>

          <Grid2
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ marginTop: "0.5rem" }}
          >
            <Grid2>
              <Typography variant="body1" color="text.secondary">
                Already have an account?
              </Typography>
            </Grid2>
            <Grid2>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                Login here
              </Link>
            </Grid2>
          </Grid2>
        </StyledFormContainer>
      </form>
    </StyledContainer>
  );
};
