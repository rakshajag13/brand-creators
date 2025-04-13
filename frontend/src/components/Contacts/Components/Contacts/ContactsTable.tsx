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
                  contacts.length > 0 && selected.length === contacts.length
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
          {contacts.map((contact) => {
            console.log(contact);
            const isSelected = selected.indexOf(contact.id) !== -1;
            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                key={contact.id}
                selected={isSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    onClick={() => onSelectClick(contact.id)}
                  />
                </TableCell>
                <StyledTableCell>{`${contact.firstName} ${contact.lastName}`}</StyledTableCell>
                <StyledTableCell>{contact.email}</StyledTableCell>
                <StyledTableCell>{contact.phone}</StyledTableCell>
                <StyledTableCell>{contact.role}</StyledTableCell>
                <StyledTableCell>{contact.status}</StyledTableCell>
                <StyledTableCell>{contact?.group?.name}</StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
