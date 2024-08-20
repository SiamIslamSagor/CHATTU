import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as LinkComponent, Navigate, useLocation } from "react-router-dom";
import { grayColor, matBlack } from "../../constants/color";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();

  const handleLogout = () => {
    console.log("logout the user");
  };

  return (
    <Stack
      width={w}
      direction={"column"}
      padding={{
        xs: "1.5rem",
        sm: "3rem",
      }}
      spacing={"3rem"}
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h5" textTransform={"uppercase"}>
        Chattu
      </Typography>
      <Stack
        spacing={"1rem"}
        sx={{
          // border: "2px dashed blue",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {adminTabs.map(tab => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: matBlack,
                color: "white",
                ":hover": {
                  bgcolor: matBlack,
                },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}{" "}
              <Typography
                fontSize={{
                  xs: "1rem",
                  sm: "1.2rem",
                }}
              >
                {tab.name}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>

      <Link onClick={handleLogout}>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          <ExitToAppIcon color="error" />
          <Typography
            fontSize={{
              xs: "1rem",
              sm: "1.2rem",
            }}
            color={"error"}
          >
            Logout
          </Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(prev => !prev);
  };

  const handleClose = () => setIsMobile(false);

  // console.log(isMobile);

  if (!isAdmin) return <Navigate to={"/admin"} />;

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: {
            xs: "0.5rem",
            sm: "1rem",
          },
          right: {
            xs: "0.5rem",
            sm: "1rem",
          },
          // bgcolor: "red",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: grayColor,
        }}
      >
        <Box
          height={{
            xs: "1.5rem",
            sm: "2rem",
          }}
          width={{
            xs: "1.5rem",
            sm: "2rem",
          }}
          // bgcolor={"yellow"}
          display={{ xs: "block", md: "none" }}
        />
        {children}
      </Grid>
      <Drawer
        open={isMobile}
        onClose={handleClose}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <Sidebar w="70vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
