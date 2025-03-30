import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    dialogContent: {
        marginBottom: "16px",
        fontSize: "14px",
        color: "#555",
    },
    selectField: {
        marginTop: "16px",
    },
    loadingIndicator: {
        marginRight: "8px",
    },
});

interface AssignUsersToGroupModalProps {
    open: boolean;
    onClose: () => void;
    userIds: number[];
}

interface Group {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

const AssignUsersToGroupModal: React.FC<AssignUsersToGroupModalProps> = ({ open, onClose, userIds }) => {
    const classes = useStyles();
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupId, setGroupId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/groups");
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                console.error("Failed to fetch groups:", error);
            }
        };

        fetchGroups();
    }, []);

    const handleAssign = async () => {
        setLoading(true);
        await fetch(`http://localhost:4000/api/groups/${groupId}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userIds }),
        });
        setLoading(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Assign Users to Group</DialogTitle>
            <DialogContent>
                <div className={classes.dialogContent}>
                    Selected <strong>{userIds.length}</strong> user{userIds.length > 1 ? "s" : ""}
                </div>
                <TextField
                    select
                    value={groupId}
                    onChange={(e) => setGroupId(Number(e.target.value))}
                    label="Group"
                    variant="outlined"
                    fullWidth
                    className={classes.selectField}
                >
                    {groups.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                            {group.name}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAssign} disabled={loading || groupId === null}>
                    {loading && <CircularProgress size={20} className={classes.loadingIndicator} />}
                    Assign
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignUsersToGroupModal;