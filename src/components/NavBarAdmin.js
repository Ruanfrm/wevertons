import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../services/conectionfirebase';
import UserListModal from '../components/UserListModal';
import UserModal from './UserModal';
import LogoutButton from './LogoutButton';

function NavBarAdmin() {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [showUserListModal, setShowUserListModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(''); // Estado para armazenar a URL do avatar
  const [name, setName ] = useState('');

  const handleToggleUserListModal = () => {
    setShowUserListModal(!showUserListModal);
  };

  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };

  // Função para buscar o usuário autenticado
  const fetchAuthenticatedUser = () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      // O usuário está autenticado
      setUser(currentUser);
      // Agora, vamos buscar a URL do avatar com base no UID do usuário no Firestore
      fetchAvatarUrl(currentUser.uid);
    } else {
      // O usuário não está autenticado
      setUser(null);
    }
  };

  // Função para buscar a URL do avatar com base no "userId" do usuário no Firestore
  const fetchAvatarUrl = (userId) => {
    const usersCollectionRef = collection(db, 'users');

    const q = query(usersCollectionRef, where('userId', '==', userId));

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const userData = doc.data();
          setAvatarUrl(userData.avatar || 'https://th.bing.com/th/id/OIP.8t1WtYLAPVB189hu7pCP3gHaHa?pid=ImgDet&rs=1');
          setName(userData.name || "Usuario não identificado")

        } else {
          setAvatarUrl('https://th.bing.com/th/id/OIP.8t1WtYLAPVB189hu7pCP3gHaHa?pid=ImgDet&rs=1');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar a URL do avatar:', error);
      });
  };

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu" style={{ marginRight: '1rem' }}>
          <MenuIcon onClick={toggleOptions} />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Werverton's
        </Typography>
        {optionsVisible && (
          <div>
            <Button color="inherit" style={{ marginRight: '1rem' }} onClick={() => setOpenUserModal(true)}>
            <PersonAddAltIcon style={{ marginRight: "10px" }} />
            Adicionar Usuário
            </Button>
            <Button
            color="inherit" style={{ marginRight: '1rem' }}
            onClick={handleToggleUserListModal}
      >
        {showUserListModal ? "Fechar Lista de Usuários" : "Listar Usuários"}
      </Button>

      <UserListModal
        open={showUserListModal}
        onClose={handleToggleUserListModal}
      />
            <LogoutButton />
            <UserModal open={openUserModal} onClose={() => setOpenUserModal(false)} />

          </div>
        )}
        {user ? (
          <div>
            <Button color="inherit" style={{ marginRight: '1rem' }}>
              {name}
            </Button>
            
            <IconButton color="inherit" style={{ marginRight: '1rem' }}>
              <img src={avatarUrl}  style={{width: '30px', borderRadius: '50px'}}/>
            </IconButton>
            
          </div>
        ) : (
          <IconButton color="inherit" style={{ marginRight: '1rem' }}>
            <AccountCircleIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBarAdmin;
