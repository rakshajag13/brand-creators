import React from 'react';
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
    Box,
    IconButton,
    Tooltip,
    Toolbar,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

const Contacts = () => {
    // Mock data for contacts
    const contacts = [
        { id: 1, firstName: 'John ', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', role: 'CREATOR', status: 'active', clientId: 1 },
        { id: 2, firstName: 'Jane ', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', role: 'CREATOR', status: 'active', clientId: 1 },
        { id: 3, firstName: 'Alice ', lastName: 'Johnson', email: 'alice.johnson@example.com', phone: '456-789-0123', role: 'CREATOR', status: 'inactive', clientId: 1 },
        { id: 4, firstName: 'John ', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', role: 'CREATOR', status: 'active', clientId: 1 },
        { id: 5, firstName: 'Jane ', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', role: 'CREATOR', status: 'active', clientId: 1 },
        { id: 6, firstName: 'Alice ', lastName: 'Johnson', email: 'alice.johnson@example.com', phone: '456-789-0123', role: 'CREATOR', status: 'inactive', clientId: 1 },
        { id: 7, firstName: 'John ', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', role: 'CREATOR', status: 'active', clientId: 1 },
        { id: 8, firstName: 'Jane ', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', role: 'CREATOR', status: 'active', clientId: 1 },
        { id: 9, firstName: 'Alice ', lastName: 'Johnson', email: 'alice.johnson@example.com', phone: '456-789-0123', role: 'CREATOR', status: 'inactive', clientId: 1 },
    ];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [dense, setDense] = React.useState(false);
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Updates the current page in the pagination state.
     * 
     * @param event - The event that triggered the page change.
     * @param newPage - The new page number to set.
     */
    /******  ff408962-f384-4eba-ba5e-d1a396ce9f41  *******/
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    interface EnhancedTableToolbarProps {
        numSelected: number;
    }
    function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
        const { numSelected } = props;
        return (
            <Toolbar
                style={
                    {
                        display: 'flex',
                        justifyContent: 'space-between',
                    }
                }

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
                    <Typography

                        style={{ fontWeight: 501 }}

                    >
                        Contacts
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    }

    return (
        <>
            <EnhancedTableToolbar numSelected={0} />
            <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden', position: 'relative' }}>

                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table
                        sx={{ minWidth: 600 }}

                        stickyHeader aria-label="sticky table"

                    >
                        <TableHead>
                            <TableRow >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                                        // checked={rowCount > 0 && numSelected === rowCount}
                                        // onChange={onSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.map((contact) => (
                                <TableRow key={contact.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            // indeterminate={numSelected > 0 && numSelected < rowCount}
                                            // checked={rowCount > 0 && numSelected === rowCount}
                                            // onChange={onSelectAllClick}
                                            inputProps={{
                                                'aria-label': 'select all desserts',
                                            }}
                                        />
                                    </TableCell>

                                    <TableCell>{contact.firstName + " " + contact.lastName}</TableCell>
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
                    count={contacts.length}
                    rowsPerPage={50}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </>

    );
};

export default Contacts;
