import { useState, useCallback, useMemo, useEffect } from "react";
import { Paper, Typography, TablePagination } from "@mui/material";
import { useContact } from "context/ContactContext";
import { Contact, Pagination } from "types/contact";
import { CreateContactModal } from "../CreateContactModal";
import { ContactsToolbar } from "./ContactsToolbar";
import { ContactsTable } from "./ContactsTable";
import { DEFAULT_PAGINATION } from "./constants";

export const Contacts = () => {
  const { getAllContacts } = useContact();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);
  const [openCreateContactModal, setOpenCreateContactModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(
    async (page: number, pageSize: number) => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllContacts({ page, pageSize });
        setContacts(data.contacts);
        setPagination((prev) => ({
          ...prev,
          ...data.pagination,
          currentPage: page,
        }));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [getAllContacts]
  );

  const paginationParams = useMemo(
    () => ({
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
    }),
    [pagination.currentPage, pagination.pageSize]
  );

  useEffect(() => {
    fetchContacts(paginationParams.page, paginationParams.pageSize);
  }, [fetchContacts, paginationParams]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage + 1,
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: parseInt(event.target.value, 10),
      currentPage: 1,
    }));
  };

  const handleCreateContact = () => {
    setOpenCreateContactModal(false);
    fetchContacts(pagination.currentPage, pagination.pageSize);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (loading) {
    return (
      <Paper sx={{ width: "100%", mb: 2, p: 3, textAlign: "center" }}>
        <Typography>Loading contacts...</Typography>
      </Paper>
    );
  }

  return (
    <>
      <ContactsToolbar
        numSelected={0}
        onCreateContact={() => setOpenCreateContactModal(true)}
      />
      <Paper sx={{ width: "100%", mb: 2, overflow: "hidden" }}>
        <ContactsTable contacts={contacts} />
        <TablePagination
          component="div"
          count={pagination.totalContacts}
          rowsPerPage={pagination.pageSize}
          page={pagination.currentPage - 1}
          onPageChange={handleChangePage}
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
};

export default Contacts;
