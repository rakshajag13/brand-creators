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
import { TABLE_HEADERS } from "./constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  // Prevent double borders
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface ContactsTableProps {
  contacts: Contact[];
}

export const ContactsTable = ({ contacts }: ContactsTableProps) => (
  <TableContainer sx={{ maxHeight: "100vh", height: "calc(100vh - 200px)" }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <StyledTableCell padding="checkbox">
            <Checkbox
              color="primary"
              inputProps={{
                "aria-label": "select all contacts",
              }}
            />
          </StyledTableCell>
          {TABLE_HEADERS.map((header) => (
            <StyledTableCell key={header.id}>{header.label}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map((contact) => (
          <StyledTableRow key={contact.id}>
            <StyledTableCell padding="checkbox">
              <Checkbox
                color="primary"
                inputProps={{
                  "aria-label": "select contact",
                }}
              />
            </StyledTableCell>
            <StyledTableCell>{`${contact.firstName} ${contact.lastName}`}</StyledTableCell>
            <StyledTableCell>{contact.email}</StyledTableCell>
            <StyledTableCell>{contact.phone}</StyledTableCell>
            <StyledTableCell>{contact.role}</StyledTableCell>
            <StyledTableCell>{contact.status}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
