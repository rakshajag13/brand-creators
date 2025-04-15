import React, { useCallback, useEffect, useState } from "react";
import { GroupsToolbar } from "../Groups/GroupsToolbar";
import { Paper, Typography } from "@mui/material";
import { GroupTable } from "./GroupTable";
import { CreateGroupModal } from "components/CreateGroupModal";

import { Group } from "types/contact";
import { useContact } from "context/ContactContext";
import { requestHandler } from "utils/requestHandler";
import ConfirmDialog from "../../../ConfirmDialog";
import { useLocation, useNavigate } from "react-router-dom";



const GroupList = () => {
    const { getAllContacts } = useContact();
    const [groups, setGroups] = useState<Group[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [groupRecord, setGroupRecord] = useState<Group | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchGroups = useCallback(
        async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await requestHandler<Group[]>('GET', '/api/groups')
                const data = res.data;
                setGroups(data);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = groups.map((group) => group.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleSelectClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleCreateGroup = () => {
        //navigate(`${location.pathname + location.hash}`);
        setOpenCreateGroupModal(false);
        fetchGroups();
    };

    const handleEditGroup = React.useCallback(() => {
        const [id] = selected;
        const contactRecord = groups.find((group) => group.id === id);
        if (!contactRecord) return;
        setGroupRecord(contactRecord);
        setOpenCreateGroupModal(true);
        setEditMode(true);

    }, [groups, selected]);
    const handleConfirmDeleteGroup = () => {
        setConfirmDialog(true);
    }

    const handleOnConfirm = () => {
        handleDeleteGroup();
        setConfirmDialog(false);
    }

    const handleDeleteGroup = useCallback(async () => {
        if (selected.length === 0) return;

        try {
            await requestHandler<Group[]>('DELETE', `/api/groups?groupIds=${selected.join(',')}`);
            setSelected([]);
            fetchGroups();
            getAllContacts({ page: 1, pageSize: 10 });
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        }
    }, [selected, fetchGroups, getAllContacts]);

    if (error) {
        return (
            <Paper sx={{ p: 3, maxWidth: "1200px", margin: "24px auto" }}>
                <Typography color="error">{error}</Typography>
            </Paper>
        );
    }

    if (loading) {
        return (
            <Paper
                sx={{
                    p: 3,
                    maxWidth: "1200px",
                    margin: "24px auto",
                    textAlign: "center",
                }}
            >
                <Typography>Loading Groups...</Typography>
            </Paper>
        );
    }
    return (
        <><GroupsToolbar
            userIds={selected}
            onEditGroup={handleEditGroup}
            onDeleteGroup={handleConfirmDeleteGroup}
            onCreateGroup={() => {
                setEditMode(false);
                setGroupRecord(undefined);
                setOpenCreateGroupModal(true)
            }} /><Paper sx={{ width: "100%", mb: 2, overflow: "hidden" }}>
                <GroupTable
                    groups={groups}
                    selected={selected}
                    onSelectAllClick={handleSelectAllClick}
                    onSelectClick={handleSelectClick} />
            </Paper>
            <CreateGroupModal
                open={openCreateGroupModal}
                onSubmit={handleCreateGroup}
                onClose={() =>
                    setOpenCreateGroupModal(false)
                }
                input={groupRecord}
                editMode={editMode} />
            <ConfirmDialog
                open={confirmDialog}
                onClose={() => {
                    setConfirmDialog(false);
                }}
                onConfirm={handleOnConfirm}

            />
        </>
    );
}


export default React.memo(GroupList);
