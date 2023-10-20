import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">Barbearia do Exemplo</Typography>
              <Typography variant="body2">
                Endereço: Rua da Barbearia, 1234 - Cidade
              </Typography>
              <Typography variant="body2">Telefone: (123) 456-7890</Typography>
              <Typography variant="body2">Email: contato@barbeariadoexemplo.com</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6">Horário de Funcionamento</Typography>
              <Typography variant="body2">Segunda a Sexta: 9:00 - 18:00</Typography>
              <Typography variant="body2">Sábado: 9:00 - 15:00</Typography>
              <Typography variant="body2">Domingo: Fechado</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography variant="h6">Siga-nos</Typography>
              <Typography variant="body2">
                <a href="https://www.facebook.com/barbeariadoexemplo" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </Typography>
              <Typography variant="body2">
                <a href="https://www.instagram.com/barbeariadoexemplo" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </Typography>
              <Typography variant="body2">
                <a href="https://www.twitter.com/barbeariadoexemplo" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
