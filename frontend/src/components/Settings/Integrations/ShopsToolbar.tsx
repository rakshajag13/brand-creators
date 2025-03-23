import { Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { shopSchema } from '../../../../../backend/src/validators/shop.validator';

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
