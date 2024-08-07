import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import { transformImage } from "../../lib/features";

// Todo: Transform

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <Box width={"5rem"} height={"3rem"} />
      <AvatarGroup max={max}>
        {avatar.map((i, index) => (
          <Avatar
            key={Math.random() * 9999 * index}
            src={transformImage(i)}
            alt={`Avatar ${index}`}
            sx={{
              width: "3rem",
              height: "3rem",
              position: "absolute",
              left: {
                xs: `${1.75 + index}rem`,
                sm: `${1 + index}rem`,
              },
            }}
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
