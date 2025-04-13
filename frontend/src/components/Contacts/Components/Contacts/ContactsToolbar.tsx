import { Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Add, Group } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import AssignUsersToGroupModal from "./AssignGroupToUsersModal";
import React from "react";

interface ContactsToolbarProps {
  userIds: number[];
  onCreateContact: () => void;
  onEditContact?: () => void;
  onDeleteContact?: () => void;
}
interface SelectedAction {
  userIds: number[];
  handleOpenAssignGroupToUsersModal: () => void;
  onEditContact?: () => void;
  onDeleteContact?: () => void;
}

const SelectedActions = ({
  userIds,
  handleOpenAssignGroupToUsersModal,
  onDeleteContact,
  onEditContact,
}: SelectedAction) => (
  <>
    <Tooltip title="AssignToGroups">
      <IconButton onClick={handleOpenAssignGroupToUsersModal}>
        <Group />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete">
      <IconButton onClick={onDeleteContact}>
        <Delete />
      </IconButton>
    </Tooltip>
    {userIds.length === 1 && (
      <Tooltip title="Edit">
        <IconButton onClick={onEditContact}>
          <Edit />
        </IconButton>
      </Tooltip>
    )}
  </>
);

const DefaultActions = ({
  onCreateContact,
}: {
  onCreateContact: () => void;
}) => (
  <Tooltip title="Add Contact">
    <IconButton onClick={onCreateContact}>
      <Add />
    </IconButton>
  </Tooltip>
);

const ToolbarTitle = ({ userIds }: { userIds: number[] }) => (
  <Typography
    sx={{ flex: "1 1 100%" }}
    color={userIds.length > 0 ? "inherit" : "textPrimary"}
    variant={userIds.length > 0 ? "subtitle1" : "h6"}
    component="div"
  >
    {userIds.length > 0 ? `${userIds.length} selected` : "Influencers"}
  </Typography>
);

export const ContactsToolbar = ({
  userIds,
  onCreateContact,
  onEditContact,
  onDeleteContact,
}: ContactsToolbarProps) => {
  const [openAssignGroupToUsersModal, setOpenAssignGroupToUsersModal] =
    React.useState(false);

  const handleOpenAssignGroupToUsersModal = () => {
    setOpenAssignGroupToUsersModal(true);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(userIds.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <ToolbarTitle userIds={userIds} />
      {userIds.length > 0 ? (
        <SelectedActions
          userIds={userIds}
          handleOpenAssignGroupToUsersModal={handleOpenAssignGroupToUsersModal}
          onEditContact={onEditContact}
          onDeleteContact={onDeleteContact}
        />
      ) : (
        <DefaultActions onCreateContact={onCreateContact} />
      )}
      <AssignUsersToGroupModal
        userIds={userIds}
        open={openAssignGroupToUsersModal}
        onClose={() => setOpenAssignGroupToUsersModal(false)}
      />
    </Toolbar>
  );
};
