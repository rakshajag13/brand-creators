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
  fontWeight: 501,
}));

interface ContactsTableProps {
  contacts: Contact[];
}

export const ContactsTable = ({ contacts }: ContactsTableProps) => (
  <TableContainer sx={{ maxHeight: "100vh", height: "calc(100vh - 200px)" }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              inputProps={{
                "aria-label": "select all contacts",
              }}
            />
          </TableCell>
          {TABLE_HEADERS.map((header) => (
            <StyledTableCell key={header.id}>{header.label}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                inputProps={{
                  "aria-label": "select contact",
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
);
