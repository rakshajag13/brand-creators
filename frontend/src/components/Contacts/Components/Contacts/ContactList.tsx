import React, { useCallback, useState } from "react";
import { ContactsToolbar } from "./ContactsToolbar";
import { Paper, TablePagination, Typography } from "@mui/material";
import { ContactsTable } from "./ContactsTable";
import { CreateContactModal } from "components/CreateContactModal";
import { useContact } from "context/ContactContext";
import { Contact } from "types/contact";
import ConfirmDialog from "../../../ConfirmDialog";



const ContactList = () => {
    const { getAllContacts, deleteContacts, contacts, pagination, setPagination } = useContact();
    const [selected, setSelected] = useState<number[]>([]);
    const [openCreateContactModal, setOpenCreateContactModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [contactRecord, setContactRecord] = useState<Contact | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = contacts.map((contact) => contact.id);
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

    const handleChangePage = (_: unknown, newPage: number) => {
        setSelected([]);
        setPagination((prev) => ({
            ...prev,
            currentPage: newPage + 1,
        }));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSelected([]);
        setPagination((prev) => ({
            ...prev,
            pageSize: parseInt(event.target.value, 10),
            currentPage: 1,
        }));
    };

    const handleCreateContact = () => {
        setOpenCreateContactModal(false);
        getAllContacts({ page: pagination.currentPage, pageSize: pagination.pageSize })

    };

    const handleEditContact = React.useCallback(() => {
        const [id] = selected;
        const contactRecord = contacts.find((contact) => contact.id === id);
        if (!contactRecord) return;
        setContactRecord(contactRecord);
        setOpenCreateContactModal(true);
        setEditMode(true);

    }, [contacts, selected]);

    const handleConfirmDeleteContact = () => {
        setConfirmDialog(true);
    }

    const handleOnConfirm = () => {
        handleDeleteContact();
        setConfirmDialog(false);
    }

    const handleDeleteContact = useCallback(async () => {
        if (selected.length === 0) return;

        try {
            await deleteContacts(selected);
            setSelected([]);
            getAllContacts({ page: pagination.currentPage, pageSize: pagination.pageSize });
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        }
    }, [selected, getAllContacts, pagination, deleteContacts]);

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
                <Typography>Loading influencers...</Typography>
            </Paper>
        );
    }
    return (
        <><ContactsToolbar
            userIds={selected}
            onEditContact={handleEditContact}
            onDeleteContact={handleConfirmDeleteContact}
            onCreateContact={() => {
                setEditMode(false);
                setContactRecord(undefined);
                setOpenCreateContactModal(true)
            }} /><Paper sx={{ width: "100%", mb: 2, overflow: "hidden" }}>
                <ContactsTable
                    contacts={contacts}
                    selected={selected}
                    onSelectAllClick={handleSelectAllClick}
                    onSelectClick={handleSelectClick} />
                <TablePagination
                    component="div"
                    count={pagination.totalContacts}
                    rowsPerPage={pagination.pageSize}
                    page={pagination.currentPage - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>
            <CreateContactModal
                open={openCreateContactModal}
                onSubmit={handleCreateContact}
                onClose={() => {
                    setOpenCreateContactModal(false);
                    getAllContacts({ page: pagination.currentPage, pageSize: pagination.pageSize })
                }
                }
                input={contactRecord}
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


export default React.memo(ContactList);
