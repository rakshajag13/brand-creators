import React, { useEffect } from "react";
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
  MenuItem,
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
  gap: "1.5rem",
  padding: "2rem",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
});

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "0.5rem 2rem",
  borderRadius: "6px",
  fontWeight: 500,
  "&.submit-button": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

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
  input?: ContactData;
  editMode?: boolean;
}

const FORM_FIELDS = [
  { name: "firstName", label: "First Name", required: true },
  { name: "lastName", label: "Last Name", required: true },
  { name: "email", label: "Email", required: true },
  {
    name: "phone",
    label: "Phone",
    required: false,
    placeholder: "+1 (555) 555-5555",
  },
] as const;

const FormField: React.FC<{
  name: keyof ContactData;
  label: string;
  control: Control<ContactData>;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
}> = ({ name, label, control, error, placeholder, disabled }) => (
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
        placeholder={placeholder}
        disabled={disabled}
      />
    )}
  />
);

export const CreateContactModal: React.FC<CreateContactModalProps> = ({
  open,
  onClose,
  onSubmit,
  input,
  editMode = false,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createContact, updateContact } = useContact();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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

  useEffect(() => {

    reset({
      email: input?.email || "",
      firstName: input?.firstName || "",
      lastName: input?.lastName || "",
      phone: input?.phone || "",
      role: input?.role || "CREATOR",
    });

  }, [input, reset]);

  const handleFormSubmit = async (data: ContactData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (!editMode) {
        const { error } = await createContact(data);
        if (error) {
          setErrorMessage(error);
          return;
        }
      } else {
        const { error } = await updateContact(input?.id || 0, data);
        if (error) {
          setErrorMessage(error);
          return;
        }
      }

      navigate("/Home");
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={!isSubmitting ? onClose : undefined}
    >
      <DialogTitle
        style={{
          fontWeight: 600,
          borderBottom: "1px solid #eee",
          padding: "1.5rem 2rem",
        }}
      >
        {editMode ? "Edit Contact" : "Create New Contact"}
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormContainer>
            {FORM_FIELDS.map(({ name, label }) => (
              <FormField
                key={name}
                name={name}
                label={label}
                control={control}
                error={errors[name]}
                disabled={name === "email" && editMode}
              />
            ))}
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Role"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.role}
                  helperText={errors.role?.message}
                >
                  {["ADMIN", "CREATOR"].map((role) => (
                    <MenuItem key={role} value={role}>
                      {role.charAt(0) + role.slice(1).toLowerCase()}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {errorMessage && (
              <Box
                sx={{
                  backgroundColor: "#fff3f3",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #ffcdd2",
                }}
              >
                <Typography variant="body2" color="error" align="center">
                  {errorMessage}
                </Typography>
              </Box>
            )}
          </FormContainer>
          <DialogActions
            sx={{ padding: "1.5rem", borderTop: "1px solid #eee" }}
          >
            <StyledButton onClick={onClose} disabled={isSubmitting}>
              Cancel
            </StyledButton>
            <StyledButton
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : editMode ? "Save Changes" : "Create Contact"}
            </StyledButton>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
