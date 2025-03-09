import { styled } from "@mui/material/styles";
import { Container, Box } from "@mui/material";

export const Root = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

export const FormContainer = styled(Box)({
  width: "100%",
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
});
