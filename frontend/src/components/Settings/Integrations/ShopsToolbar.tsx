import { IconButton, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";

interface ContactsToolbarProps {
    onCreateShop: () => void
}

export const ShopsToolbar = ({
    onCreateShop,
}: ContactsToolbarProps) => {
    return (
        <Tooltip title="Add Shop">
            <IconButton onClick={onCreateShop}>
                <Add />
            </IconButton>
        </Tooltip>
    );
};
