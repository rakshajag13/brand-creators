import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Control, Controller, FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import { ContactData } from "../types/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContact } from "context/ContactContext";
import { useNavigate } from "react-router-dom";

const FormContainer = styled(Box)({
  width: "100%",
  maxWidth: 500,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
});

export const contactSchema = z.object({
  email: z.string().email("Invalid email format"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().optional(),
  role: z.enum(["ADMIN", "CLIENT", "CREATOR"]),
});

interface CreateContactModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ContactData) => void;
}

// Separate form fields configuration
const FORM_FIELDS = [
  { name: "firstName", label: "First Name", required: true },
  { name: "lastName", label: "Last Name", required: true },
  { name: "email", label: "Email", required: true },
  { name: "phone", label: "Phone", required: false },
] as const;

// Reusable form field component
const FormField: React.FC<{
  name: keyof ContactData;
  label: string;
  control: Control<ContactData>;
  error?: FieldError;
}> = ({ name, label, control, error }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        {...field}
        error={!!error}
        helperText={error?.message}
      />
    )}
  />
);

export const CreateContactModal: React.FC<CreateContactModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { createContact } = useContact();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      role: "CREATOR",
    },
  });

  const handleFormSubmit = async (data: ContactData) => {
    try {
      const { error } = await createContact(data);
      if (error) {
        setErrorMessage(error);
        return;
      }
      navigate("/Home");
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle style={{ fontWeight: 501 }}>Create Contact</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormContainer>
            {FORM_FIELDS.map(({ name, label }) => (
              <FormField
                key={name}
                name={name}
                label={label}
                control={control}
                error={errors[name]}
              />
            ))}
          </FormContainer>
          {errorMessage && (
            <Typography
              variant="body1"
              color="error"
              align="center"
              gutterBottom
            >
              {errorMessage}
            </Typography>
          )}
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
