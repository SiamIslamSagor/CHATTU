import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const groupName = useInputValidation("");

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSelectMember = id => {
    setSelectedMembers(prev =>
      prev.includes(id)
        ? prev.filter(currentEl => currentEl !== id)
        : [...prev, id]
    );
  };

  console.log(selectedMembers);

  const handleSubmit = () => {
    console.log("object");
  };

  const handleDialogClose = () => {
    console.log("object");
  };

  return (
    <Dialog open onClose={handleDialogClose}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle variant="h4" textAlign={"center"}>
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography variant="body1">Members</Typography>

        <Stack>
          {members.map(user => (
            <UserItem
              key={user?._id}
              isAdded={selectedMembers.includes(user._id)}
              user={user}
              handler={handleSelectMember}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"end"} spacing={"2rem"}>
          <Button variant="text" color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
