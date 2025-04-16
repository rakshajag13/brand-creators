import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Contact } from "types/contact";
import { TABLE_HEADERS } from "../../constants";
import { useAuth } from 'context/AuthContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));


interface ContactsTableProps {
  contacts: Contact[];
  selected: number[];
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectClick: (id: number) => void;
}

export const ContactsTable = ({
  contacts,
  selected,
  onSelectAllClick,
  onSelectClick,
}: ContactsTableProps) => {
  const { user } = useAuth();
  return (
    <TableContainer sx={{ maxHeight: "100vh", height: "calc(100vh - 200px)" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selected.length > 0 && selected.length < contacts.length
                }
                checked={
                  (contacts?.length ?? 0) > 0 && selected.length === (contacts?.length ?? 0)
                }
                onChange={onSelectAllClick}
              />
            </TableCell>
            {TABLE_HEADERS.map((header) => (
              <StyledTableCell key={header.id}>{header.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts?.map((contact) => {
            const groups = contact.groups.map((group) => group.name);
            const isSelected = selected.indexOf(contact.id) !== -1;
            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                key={contact.id}
                selected={isSelected}
                //gray out row contact.email === user?.email
                style={{
                  opacity: contact.email === user?.email ? 0.5 : 1,
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    onClick={() => onSelectClick(contact.id)}
                    disabled={contact.email === user?.email}
                  />
                </TableCell>
                <StyledTableCell>{`${contact.firstName} ${contact.lastName}`}</StyledTableCell>
                <StyledTableCell>{contact.email}</StyledTableCell>
                <StyledTableCell>{contact.phone}</StyledTableCell>
                <StyledTableCell>{contact.role}</StyledTableCell>
                <StyledTableCell>{contact.status}</StyledTableCell>
                <StyledTableCell>{groups?.join(", ")}</StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
