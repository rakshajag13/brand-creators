import { Box, IconButton, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";

interface DesktopIconsProps {
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

export const DesktopIcons = ({ handleProfileMenuOpen }: DesktopIconsProps) => (
  <Box sx={{ display: { xs: "none", md: "flex" } }}>
    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
      <Badge badgeContent={4} color="error">
        <MailIcon />
      </Badge>
    </IconButton>
    <IconButton
      size="large"
      aria-label="show 17 new notifications"
      color="inherit"
    >
      <Badge badgeContent={17} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-controls="primary-search-account-menu"
      aria-haspopup="true"
      onClick={handleProfileMenuOpen}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
  </Box>
);
