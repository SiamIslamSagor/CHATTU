/* eslint-disable react/prop-types */
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "../../constants/color";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

const NewGroup = lazy(() => import("../specific/NewGroup"));
const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notifications"));

function Header() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    console.log("mobile nav call");
    setIsMobile(prev => !prev);
  };
  const handleOpenSearch = () => {
    console.log("search  open");
    setIsSearch(prev => !prev);
  };
  const handleOpenNewGroup = () => {
    setIsNewGroup(prev => !prev);
    console.log("open new group");
  };
  const handleNotification = () => {
    console.log("open new group");
    setIsNotification(prev => !prev);
  };
  const handleNavigateGroup = () => {
    return navigate("/groups");
  };
  const handleLogout = () => {
    console.log("log out the user");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
            zIndex: 9999999999,
          }}
        >
          <Toolbar>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                variant="h6"
                color="white"
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                Chattu
              </Typography>
            </Link>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn
                title={"Search Friends"}
                icon={<SearchIcon />}
                onClick={handleOpenSearch}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={handleOpenNewGroup}
              />
              <IconBtn
                title={"Manage Group"}
                icon={<GroupIcon />}
                onClick={handleNavigateGroup}
              />
              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={handleNotification}
              />
              <IconBtn
                title={"Log out"}
                icon={<LogoutIcon />}
                onClick={handleLogout}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroup />
        </Suspense>
      )}
    </>
  );
}

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
