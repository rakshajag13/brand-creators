import { Box, IconButton, Badge, Typography, Avatar } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";

interface DesktopIconsProps {
  handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  userName: string; // Add a prop for the logged-in user's name
}

export const DesktopIcons = ({ handleProfileMenuOpen, userName }: DesktopIconsProps) => (
  <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        padding: "4px 8px",
        borderRadius: "16px",
      }}
    >
      <Avatar sx={{ width: 32, height: 32 }}>{userName.charAt(0)}</Avatar>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {userName}
      </Typography>
      <IconButton
        size="small"
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
  </Box>
);
