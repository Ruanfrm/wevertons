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
    <Button color="inherit" style={{ marginRight: '1rem' }} onClick={handleLogout}>
    <LogoutIcon style={{marginLeft: '10px'}}/>
    </Button>
  );
};

export default LogoutButton;
