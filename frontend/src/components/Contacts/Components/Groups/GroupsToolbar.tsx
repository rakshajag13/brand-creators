import { Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Add, Group } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import React from "react";

interface GroupsToolbarProps {
  userIds: number[];
  onCreateGroup: () => void;
  onEditGroup?: () => void;
  onDeleteGroup?: () => void;
}
interface SelectedAction {
  userIds: number[];
  onEditGroup?: () => void;
  onDeleteGroup?: () => void;
}

const SelectedActions = ({
  userIds,
  onEditGroup,
  onDeleteGroup,
}: SelectedAction) => (
  <>
    <Tooltip title="Delete">
      <IconButton onClick={onDeleteGroup}>
        <Delete />
      </IconButton>
    </Tooltip>
    {userIds.length === 1 && (
      <Tooltip title="Edit">
        <IconButton onClick={onEditGroup}>
          <Edit />
        </IconButton>
      </Tooltip>
    )}
  </>
);

const DefaultActions = ({
  onCreateGroup,
}: {
  onCreateGroup: () => void;
}) => (
  <Tooltip title="Add Group">
    <IconButton onClick={onCreateGroup}>
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
    {userIds.length > 0 ? `${userIds.length} selected` : "Groups"}
  </Typography>
);

export const GroupsToolbar = ({
  userIds,
  onCreateGroup,
  onEditGroup,
  onDeleteGroup
}: GroupsToolbarProps) => {

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
          onEditGroup={onEditGroup}
          onDeleteGroup={onDeleteGroup}
        />
      ) : (
        <DefaultActions onCreateGroup={onCreateGroup} />
      )}
    </Toolbar>
  );
};
