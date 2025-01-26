import { Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

interface ContactsToolbarProps {
  numSelected: number;
  onCreateContact: () => void;
}

export const ContactsToolbar = ({
  numSelected,
  onCreateContact,
}: ContactsToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
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
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Contacts
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton>
              <Delete />
            </IconButton>
          </Tooltip>
          {numSelected === 1 && (
            <Tooltip title="Edit">
              <IconButton>
                <Edit />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        <Tooltip title="Add Contact">
          <IconButton onClick={onCreateContact}>
            <Add />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
