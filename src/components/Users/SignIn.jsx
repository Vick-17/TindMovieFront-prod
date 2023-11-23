import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, Toaster } from "react-hot-toast";
import { userSignIn } from "../../service/apiService";

const defaultTheme = createTheme();

export default function SignUp() {

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nameValue = data.get("firstName");
    const lastNameValue = data.get("lastName");
    const usernameValue = data.get("username");
    const emailValue = data.get("email");
    const passwordValue = data.get("password");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      nameValue.trim() === "" ||
      lastNameValue.trim() === "" ||
      usernameValue.trim() === ""
    ) {
      toast.error("Champ vide");
    } else if (!emailRegex.test(emailValue) || emailValue === "") {
      toast.error("Email non valide");
    } else if (!(passwordValue.length >= 12 &&
      /[A-Z]/.test(passwordValue) &&
      /\d/.test(passwordValue) &&
      /[@$!%*?&]/.test(passwordValue) &&
      !/^\s*$/.test(passwordValue))) {
      toast.error(
        "Le mot de passe doit comporter au moins 12 caractères et 1 caractère spécial, 1 chiffre, 1 majuscule."
      );
    } else {
      const formData = {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
      };

      try {
        await userSignIn(formData);
        toast.success("Inscription reussi")
      } catch (error) {
        toast.error("L'email existe déjà dans la base de données")
        console.error(error);
      }
    }
  };

  return (
    <div className="form_container">
      <ThemeProvider theme={defaultTheme}>
        <Toaster position="top-center" reverseOrder={false} />
        <Container component="main" maxWidth="xs" className="sign_container">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              S'inscrire
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Pseudo"
                    name="username"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Addresse Email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                S'inscrire
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
