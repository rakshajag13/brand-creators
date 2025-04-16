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
import { Group } from "types/contact";
import { TABLE_HEADERS_GROUPS } from "../../constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 500,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
}));


interface GroupTableProps {
    groups: Group[];
    selected: number[];
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectClick: (id: number) => void;
}

export const GroupTable = ({
    groups,
    selected,
    onSelectAllClick,
    onSelectClick,
}: GroupTableProps) => {
    return (
        <TableContainer sx={{ maxHeight: "100vh", height: "calc(100vh - 200px)" }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={
                                    selected.length > 0 && selected.length < groups.length
                                }
                                checked={
                                    groups.length > 0 && selected.length === groups.length
                                }
                                onChange={onSelectAllClick}
                            />
                        </TableCell>
                        {TABLE_HEADERS_GROUPS.map((header) => (
                            <StyledTableCell key={header.id}>{header.label}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(Array.isArray(groups) ? groups : []).map((group) => {
                        const isSelected = selected.indexOf(group.id) !== -1;
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={group.id}
                                selected={isSelected}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isSelected}
                                        onClick={() => onSelectClick(group.id)}
                                    />
                                </TableCell>
                                <StyledTableCell>{`${group.name}`}</StyledTableCell>
                                <StyledTableCell>{group.description}</StyledTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
