import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import {
  // CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { matBlack } from "../../constants/color";

const Dashboard = () => {
  const AppBar = (
    <Paper
      elevation={3}
      sx={{
        padding: {
          xs: "0.5rem",
          sm: "1rem",
          md: "2rem",
        },
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={{
          xs: "0.5rem",
          sm: "1rem",
        }}
      >
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        />

        <SearchField placeholder="Search..." />

        {/* <CurveButton>Search</CurveButton> */}

        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: "1.5rem",
            padding: "0.65rem 2rem",
            border: "none",
            outline: "none",
            cursor: "pointer",
            backgroundColor: matBlack,
            color: "white",
            fontSize: "1.1rem",
            textTransform: "capitalize",

            ":hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          Search
        </Button>

        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0, 0, 0, 0.7)"}
          textAlign={"center"}
        >
          {moment().format("MMMM Do YYYY")}
        </Typography>

        <IconButton color="inherit">
          <NotificationsIcon
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
              },
            }}
          />
        </IconButton>
      </Stack>{" "}
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users "} value={48} Icon={<PersonIcon />} />
      <Widget title={"Chats "} value={4} Icon={<GroupIcon />} />
      <Widget title={"Messages "} value={629} Icon={<MessageIcon />} />
    </Stack>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {AppBar}
        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          sx={{
            gap: "2rem",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: {
                xs: "1rem 1.5rem",
                sm: "2rem 3.5rem",
              },
              borderRadius: "1rem",
              width: "100%",
              maxWidth: {
                xs: "45rem",
              },
            }}
          >
            <Typography
              variant="h4"
              margin={{
                xs: "1rem 0",
                sm: "2rem 0",
              }}
              fontSize={{
                xs: "1.5rem",
                sm: "2rem",
              }}
            >
              Last Messages
            </Typography>

            <LineChart value={[23, 52, 30, 41, 12, 34]} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[23, 67]}
            />

            <Stack
              position={"absolute"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
              // border={"4px dashed blue"}
              // // left={"50%"}
              sx={
                {
                  // transform: "translateX(-50%)",
                  // bgcolor: "red",
                }
              }
            >
              <GroupIcon /> <Typography>vs </Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: {
        xs: "100%",
        sm: "20rem",
      },
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0, 0, 0, 0.7)",
          borderRadius: "50%",
          border: `5px solid ${matBlack}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
