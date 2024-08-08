import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from "../components/shared/AvatarCard";
import { Link } from "../components/styles/StyledComponents";
import { bgGradient, matBlack } from "../constants/color";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/shared/ConfirmDialog")
);

const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const isAddMember = false;

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();

  // states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  // handlers
  const handleNavigateBack = () => {
    navigate("/");
    console.log("go back prev page");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleUpdateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const handleOpenAddMember = () => {
    console.log("add member");
  };

  const handleOpenConfirmDelete = () => {
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  };

  const handleDelete = () => {
    console.log("Delete handler");
    handleCloseConfirmDelete();
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteDialog(false);
  };

  const handleRemoveMember = id => {
    console.log(id);
  };

  // effect
  useEffect(() => {
    if (chatId) {
      setGroupName(`My Group ${chatId}`);
      setGroupNameUpdatedValue(`My Group ${chatId}`);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconButtons = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1.5rem",
            top: "1.5rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1.5rem",
            left: "1.5rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={handleNavigateBack}
        >
          <KeyboardBackspaceIcon />{" "}
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={e => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={handleUpdateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName} </Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      padding={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
      spacing={{
        sm: "1rem",
        md: "2rem",
      }}
    >
      <Button
        startIcon={<DeleteIcon />}
        size="large"
        color="error"
        onClick={handleOpenConfirmDelete}
      >
        Delete Group
      </Button>
      <Button
        startIcon={<AddIcon />}
        size="large"
        variant="contained"
        onClick={handleOpenAddMember}
      >
        Add Member
      </Button>
    </Stack>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },

          backgroundImage: bgGradient,
        }}
      >
        <GroupList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        lg={9}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconButtons}

        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* members */}
              {sampleUsers.map(user => (
                <UserItem
                  user={user}
                  key={user._id}
                  isAdded
                  handler={handleRemoveMember}
                  styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                />
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={handleCloseConfirmDelete}
            handleConfirm={handleDelete}
            dialogTitle={"Confirm Delete"}
            dialogDescription={"Are you sure you want to delete this group?"}
          />
        </Suspense>
      )}

      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <GroupList w="70vw" myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map(group => (
        <GroupListItem key={group._id} group={group} chatId={chatId} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No groups
      </Typography>
    )}
  </Stack>
);

const MemorizedGroupListItem = ({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={e => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
};

const GroupListItem = memo(MemorizedGroupListItem);

export default Groups;
