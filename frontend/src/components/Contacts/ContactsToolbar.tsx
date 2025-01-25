import { Button, Toolbar, Typography } from "@mui/material";

interface ContactsToolbarProps {
  numSelected: number;
  onCreateContact: () => void;
}

export const ContactsToolbar = ({
  numSelected,
  onCreateContact,
}: ContactsToolbarProps) => (
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      border: "1px solid #ccc",
    }}
  >
    {numSelected > 0 ? (
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected} selected
      </Typography>
    ) : (
      <Typography sx={{ fontWeight: 501 }}>Contacts</Typography>
    )}
    <Button
      variant="outlined"
      color="inherit"
      sx={{ fontWeight: 400 }}
      onClick={onCreateContact}
    >
      Create Contact
    </Button>
  </Toolbar>
);
