import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';
import logo from '../imagens/logo.png'
const Splash = () => {
  // Define o estado para controlar o redirecionamento
  const [redirect, setRedirect] = useState(false);

  // Adicione o caminho ou URL da sua logo aqui
const logoUrl = logo;
  
  useEffect(() => {
    // Define um temporizador para aguardar alguns segundos (por exemplo, 3 segundos)
    const timer = setTimeout(() => {
      // Atualiza o estado para redirecionar para a página principal
      setRedirect(true);
    }, 3000);

    // Limpa o temporizador ao desmontar o componente
    return () => clearTimeout(timer);
  }, []); // O segundo argumento vazio [] garante que o useEffect seja executado apenas uma vez

  // Se o estado de redirecionamento for verdadeiro, redirecione para a página principal
  if (redirect) {
    return <Navigate to="/inicio" />;
  }

  // Se ainda estiver na tela de splash, você pode personalizar a aparência conforme necessário
  return (
    <Container>
      

    

      {/* Adiciona a logo */}
      <img src={logoUrl} alt="Logo" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', display: 'block', marginTop: '70px' }} />

      {/* Adiciona o spinner enquanto a tela de splash está sendo exibida */}
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '40vh' }}>
        <CircularProgress style={{marginRight: '10px'}} />
        Máquina do tempo sendo carregada
      </Grid>

    </Container>
  );
};

export default Splash;
