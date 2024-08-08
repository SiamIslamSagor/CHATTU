import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useState } from "react";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSelectMember = id => {
    setSelectedMembers(prev =>
      prev.includes(id)
        ? prev.filter(currentEl => currentEl !== id)
        : [...prev, id]
    );
  };

  const handleClose = () => {
    setMembers([]);
    setSelectedMembers([]);
  };

  const handleSubmitAddMember = () => {
    handleClose();
  };

  return (
    <Dialog open onClose={handleClose}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map(user => (
              <UserItem
                user={user}
                handler={handleSelectMember}
                isAdded={selectedMembers.includes(user._id)}
                key={user._id}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitAddMember}
            variant="contained"
            disabled={isLoadingAddMember}
          >
            Submit changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
