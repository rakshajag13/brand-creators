
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Checkbox,
    TablePagination,
    Toolbar,
    Button,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { CreateContactModal } from './CreateContactModal';
import { useContact } from 'context/ContactContext';
import { Pagination } from 'types/contact';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 501
}));

interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    clientId: number;
}

const Contacts = React.memo(() => {
    const { getAllContacts } = useContact();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        totalContacts: 0,
        pageSize: 10,
        currentPage: 1,
        totalPages: 0,
    });
    const [openCreateContactModal, setOpenCreateContactModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Memoize fetchContacts to prevent unnecessary re-creation
    const fetchContacts = useCallback(async (page: number, pageSize: number) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllContacts({ page, pageSize });

            setContacts(data.contacts);
            setPagination(prevPagination => ({
                ...prevPagination,
                ...data.pagination,
                currentPage: page
            }));
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [getAllContacts]);

    // Use useMemo to memoize pagination parameters
    const paginationParams = useMemo(() => ({
        page: pagination.currentPage,
        pageSize: pagination.pageSize
    }), [pagination.currentPage, pagination.pageSize]);

    // Optimized useEffect with memoized dependencies
    useEffect(() => {
        fetchContacts(paginationParams.page, paginationParams.pageSize);
    }, [fetchContacts, paginationParams]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPagination(prevPagination => ({
            ...prevPagination,
            currentPage: newPage + 1 // Adjust for zero-indexing
        }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPageSize = parseInt(event.target.value, 10);
        setPagination(prevPagination => ({
            ...prevPagination,
            pageSize: newPageSize,
            currentPage: 1 // Reset to first page when changing rows per page
        }));
    };

    const handleCreateContact = () => {
        setOpenCreateContactModal(false);
        // Optionally, refresh contacts after creation
        fetchContacts(pagination.currentPage, pagination.pageSize);
    };

    function EnhancedTableToolbar({ numSelected }: { numSelected: number }) {
        return (
            <Toolbar
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: '1px solid #ccc',
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography style={{ fontWeight: 501 }}>
                        Contacts
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="outlined"
                    color="inherit"
                    style={{ fontWeight: 400 }}
                    onClick={() => setOpenCreateContactModal(true)}
                >
                    Create Contact
                </Button>
            </Toolbar>
        );
    }

    // Display error if exists
    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <EnhancedTableToolbar numSelected={0} />
            <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: '100vh', height: 'calc(100vh - 200px)' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        inputProps={{
                                            'aria-label': 'select all contacts',
                                        }}
                                    />
                                </TableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Phone</StyledTableCell>
                                <StyledTableCell>Role</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.map((contact) => (
                                <TableRow key={contact.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            inputProps={{
                                                'aria-label': 'select contact',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{`${contact.firstName} ${contact.lastName}`}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.role}</TableCell>
                                    <TableCell>{contact.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={pagination?.totalContacts}
                    rowsPerPage={pagination?.pageSize}
                    page={pagination?.currentPage - 1} // Zero-index for Material-UI
                    onPageChange={(event, newPage) => {
                        handleChangePage(event, newPage);
                    }}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <CreateContactModal
                open={openCreateContactModal}
                onSubmit={handleCreateContact}
                onClose={() => setOpenCreateContactModal(false)}
            />
        </>
    );
});

export default Contacts;