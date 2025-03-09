import { TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface LoginFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
}

export const LoginFormField = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
}: LoginFormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        label={label}
        variant="outlined"
        type={type}
        fullWidth
        {...field}
        error={!!error}
        helperText={error?.message}
      />
    )}
  />
);
