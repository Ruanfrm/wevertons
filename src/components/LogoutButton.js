import React from 'react';
import { Button } from '@mui/material';
import { auth } from '../services/conectionfirebase'; // Importe o módulo de autenticação do Firebase
import LogoutIcon from '@mui/icons-material/Logout';
const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Chame o método de logout do Firebase
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Sair da conta
    <LogoutIcon style={{marginLeft: '10px'}}/>
    </Button>
  );
};

export default LogoutButton;
