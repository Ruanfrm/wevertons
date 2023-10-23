import React from 'react';
import { Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, GitHub } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import PrintIcon from '@mui/icons-material/Print';

export default function App() {
  return (
    <footer >
      <Container>
        <Grid container justifyContent="space-between" alignItems="center" style={{ padding: '1rem 0', borderBottom: '1px solid #ccc' }}>
          <Grid item xs={12} lg={6}>
            <Typography variant="body1" display="inline" style={{ marginRight: '1rem' }}>
            Conecte-se conosco nas redes sociais:
            </Typography>
            <IconButton>
              <Facebook color="primary" />
            </IconButton>
            <IconButton>
              <Twitter color="primary" />
            </IconButton>
            <IconButton>
              <Instagram color="primary" />
            </IconButton>
            <IconButton>
              <LinkedIn color="primary" />
            </IconButton>
            
          </Grid>
        </Grid>

        <Grid container spacing={4} style={{ paddingTop: '2rem' }}>
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Weverton's Barber-Shop
            </Typography>
            <Typography variant="body2" >
            O seu destino para um visual impecável e um atendimento de primeira classe. Nosso time de barbeiros experientes e apaixonados está aqui para transformar a sua aparência e fazer você se sentir confiante a cada corte.</Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Serviços
            </Typography>
            <Typography variant="body2">
              <Link href="#servicos">Cabelo</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#servicos">Barba</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#servicos">Sobrencelha</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#servicos">Bar</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
            Links úteis
            </Typography>
            <Typography variant="body2">
              <Link href="#">Preços</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="https://sites.appbarber.com.br/barbeariadoweve-dtvx">Agendar</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#">Elogios</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#">Ajuda</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Typography variant="body2">
              <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <LocationOnIcon style={{ marginRight: '8px'}} />Tv. José Pessoa de Queirós - Centro, Ereré - CE, 63470-000</span>
            </Typography>
            <Typography variant="body2">
              <span style={{display: 'flex', alignItems: 'center'}}> <MailOutlineIcon style={{ marginRight: '8px', marginTop: '5px'}} /> info@example.com</span>
            </Typography>
            <Typography variant="body2">
              <span style={{display: 'flex', alignItems: 'center'}}> <PhoneIcon style={{ marginRight: '8px',  marginTop: '5px'}} /> + 01 234 567 88</span>
            </Typography>
            <Typography variant="body2">
              <span style={{display: 'flex', alignItems: 'center'}}> <PrintIcon  style={{ marginRight: '8px',  marginTop: '5px'}}/> + 01 234 567 89</span>
            </Typography>
          </Grid>
        </Grid>

        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '1rem 0', textAlign: 'center' }}>
          <Typography variant="body2" color="primary" >
            &copy; 2023 Todos os direitos reservados,
              Weverton's Barber-Shop
          </Typography>
        </div>
      </Container>
    </footer>
  );
}
