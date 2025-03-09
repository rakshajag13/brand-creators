import { Controller, Control } from "react-hook-form";
import { MenuItem, Select } from "@mui/material";
import { BrandSignupData } from "types/brandSignup";
import { MENU_PROPS } from "../constants/brandSignup";

interface DomainSelectProps {
  control: Control<BrandSignupData>;
  domains: Array<{ domain: string; id: number }>;
}

export const DomainSelect: React.FC<DomainSelectProps> = ({
  control,
  domains,
}) => (
  <Controller
    name="domain"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Select
        labelId="domain-select-label"
        id="domain-select"
        value={value}
        onChange={onChange}
        MenuProps={MENU_PROPS}
      >
        {domains.map((domain) => (
          <MenuItem key={domain.id} value={domain.domain}>
            {domain.domain}
          </MenuItem>
        ))}
      </Select>
    )}
  />
);
