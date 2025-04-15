import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    disableBackdropClick?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title = "Confirm",
    message = "Are you sure you want to proceed?",
    confirmButtonText = "Ok",
    cancelButtonText = "Cancel",
    disableBackdropClick = false,
}) => {
    return (
        <Dialog
            open={open}
            onClose={disableBackdropClick ? undefined : onClose}
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {cancelButtonText}
                </Button>
                <Button onClick={onConfirm} color="primary" variant="contained">
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
