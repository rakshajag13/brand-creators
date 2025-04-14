import React, { useCallback, useEffect, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { GroupData, GroupResponse } from "../types/contact";

// Styled Components
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

// Validation Schema
const GroupSchema = z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
});

const FORM_FIELDS = [
    { name: "name", label: "Name" },
    { name: "description", label: "Description" },
] as const;

// Props Interface
interface CreateGroupModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: GroupData) => void;
    input?: GroupData;
    editMode?: boolean;
}

// Form Field Component
const FormField: React.FC<{
    name: keyof GroupData;
    label: string;
    control: Control<GroupData>;
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

// Main Component
export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
    open,
    onClose,
    onSubmit,
    input,
    editMode = false,
}) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [group, setgroup] = useState<GroupData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<GroupData>({
        resolver: zodResolver(GroupSchema),
        mode: "onSubmit",
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const updateGroup = useCallback(async (id: number, data: GroupData) => {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:4000/api/groups/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    // Add authorization token if needed
                    // "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to update contact");
            }
            const groupResponse: GroupResponse = await res.json();
            setgroup(groupResponse.group);

            return {
                data: groupResponse,
                error: null,
            };
        } catch (error) {
            console.error("Update contact error:", error);
            return {
                error: error instanceof Error ? error.message : "Unknown error",
                data: null,
            };
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        reset({
            name: input?.name || "",
            description: input?.description || "",
        });
    }, [input, reset]);

    const handleFormSubmit = async (data: GroupData) => {
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const response = editMode
                ? await updateGroup(input?.id || 0, data)
                : await fetch("http://localhost:4000/api/groups", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

            if ('error' in response && response.error) {
                setErrorMessage(response.error);
                return;
            }

            navigate("/Home");
        } catch {
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
                sx={{
                    fontWeight: 600,
                    borderBottom: "1px solid #eee",
                    padding: "1.5rem 2rem",
                }}
            >
                {editMode ? "Edit Group" : "Create New Group"}
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
                            />
                        ))}
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
                            {isSubmitting ? "Saving..." : editMode ? "Save Changes" : "Create Group"}
                        </StyledButton>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};
