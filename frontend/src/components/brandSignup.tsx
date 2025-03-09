import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BrandSignupData } from "types/brandSignup";
import { useAuth } from "context/AuthContext";
import { FormField } from "./FormField";
import { DomainSelect } from "./DomainSelect";
import { FORM_FIELDS, DOMAINS } from "../constants/brandSignup";
import { StyledFormContainer, StyledRoot } from "../styles/brandSignup.styles";
import { brandSignupSchema } from "./schemas/brandSignup.schema";

export const BrandSignup: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BrandSignupData>({
    resolver: zodResolver(brandSignupSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      companyName: "",
      industry: "",
      website: "",
      businessType: "",
      phone: "",
      domain: DOMAINS[0].domain,
    },
  });
  const navigate = useNavigate();
  const { brandSignup: signupUser } = useAuth();

  const onSubmit = async (data: BrandSignupData) => {
    await signupUser(data);
    navigate("/Home");
  };

  return (
    <StyledRoot>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFormContainer>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
          >
            Brand Signup
          </Typography>

          {FORM_FIELDS.map((field) => (
            <FormField
              key={field.name}
              field={field}
              control={control}
              errors={errors}
            />
          ))}

          <DomainSelect control={control} domains={DOMAINS} />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "0.5rem" }}
          >
            Signup
          </Button>
        </StyledFormContainer>
      </form>
    </StyledRoot>
  );
};
