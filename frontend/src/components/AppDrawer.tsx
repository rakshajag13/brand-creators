import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  text: string;
  path: string;
}

const MENU_ITEMS: MenuItem[] = [
  { text: "Contacts", path: "/contacts" },
  { text: "Payments", path: "/payments" },
];

interface AppDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

export default function AppDrawer({ open, toggleDrawer }: AppDrawerProps) {
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path, { replace: true });
    toggleDrawer(false);
  };

  const handleClose = () => {
    toggleDrawer(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {MENU_ITEMS.map(({ text, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(path)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={handleClose}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
