import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { BrandSignupData } from "types/brandSignup";

interface FormFieldProps {
  field: {
    name: keyof BrandSignupData;
    label: string;
    type?: string;
  };
  control: Control<BrandSignupData>;
  errors: FieldErrors<BrandSignupData>;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  control,
  errors,
}) => (
  <Controller
    name={field.name}
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
        error={!!errors[field.name]}
        helperText={errors[field.name]?.message}
      />
    )}
  />
);
