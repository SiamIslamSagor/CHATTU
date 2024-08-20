import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { bgGradient } from "../../constants/color";

const isAdmin = true;
const AdminLogin = () => {
  const secretKey = useInputValidation("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log("submitted.");
  };

  if (isAdmin) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              required
              fullWidth
              type="password"
              label="Secret Key"
              variant="outlined"
              margin="normal"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{
                marginTop: "1rem",
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
