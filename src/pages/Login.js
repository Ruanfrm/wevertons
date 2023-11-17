import React, { useState } from "react";
import { Button, TextField, Avatar, CssBaseline, FormControlLabel, Checkbox, Link, Grid, Typography, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/conectionfirebase";
import { useNavigate } from 'react-router-dom'
import ForgotPasswordModal from "../components/ForgotPasswordModal"; // Importe o componente modal aqui


const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false); // Estado para controlar a exibição do modal


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login bem-sucedido, não é necessário redirecionamento no frontend
      navigate("/adm", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = () => {
    // Aqui você pode adicionar a lógica para lidar com o esquecimento de senha, como abrir um modal ou uma nova página.
    console.log("Implemente a lógica de esqueci minha senha aqui.");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </form>
          <Grid container>
            <Grid item xs>
              {/* Abra o modal de "Esqueceu a senha?" ao clicar no link */}
              <Link component="button" variant="body2" onClick={() => setForgotPasswordOpen(true)}>
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </div>
      </Container>

      {/* Renderize o modal de "Esqueceu a senha?" */}
      <ForgotPasswordModal open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </ThemeProvider>
  );
}
