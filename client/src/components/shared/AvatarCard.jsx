import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import { transformImage } from "../../lib/features";
import { useLocation } from "react-router-dom";

// Todo: Transform

const AvatarCard = ({ avatar = [], max = 4 }) => {
  const location = useLocation();

  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup
        max={max}
        sx={{
          position: "relative",
        }}
      >
        <Box width={"5rem"} height={"3rem"} />
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
                // xs: `${0.5 + index}rem`,
                // sm: `${index}rem`,
                xs: `${
                  location.pathname.includes("admin")
                    ? 0.5 + index
                    : 1.75 + index
                }rem`,
                sm: `${
                  location.pathname.includes("admin") ? index : 1 + index
                }rem`,
              },
            }}
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
