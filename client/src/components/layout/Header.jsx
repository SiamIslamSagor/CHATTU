import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { orange } from "../../constants/color";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";

function Header() {
  const handleMobile = () => {
    console.log("mobile nav call");
  };
  const handleOpenSearchDialog = () => {
    console.log("search dialog open");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Chattu
            </Typography>
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
              <IconButton
                color="inherit"
                size="large"
                onClick={handleOpenSearchDialog}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
