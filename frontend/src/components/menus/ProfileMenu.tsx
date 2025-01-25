import { Menu, MenuItem } from "@mui/material";

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  handleMenuClose: () => void;
  handleLogout: () => void;
}

export const ProfileMenu = ({
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  handleLogout,
}: ProfileMenuProps) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    id="primary-search-account-menu"
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
  </Menu>
);
