import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { db, auth } from '../services/conectionfirebase';

const UserModal = ({ open, onClose, updateUser }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [emptyFieldsAlert, setEmptyFieldsAlert] = useState(false);

  const handleShowErrorAlert = () => {
    setErrorAlert(true);
  };

  const handleShowSuccessAlert = () => {
    setSuccessAlert(true);
  };

  const handleShowEmptyFieldsAlert = () => {
    setEmptyFieldsAlert(true);
  };

  const handleErrorAlertClose = () => {
    setErrorAlert(false);
  };

  const handleSuccessAlertClose = () => {
    setSuccessAlert(false);
  };

  const handleEmptyFieldsAlertClose = () => {
    setEmptyFieldsAlert(false);
  };

  const handleAddUser = async () => {
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      handleShowEmptyFieldsAlert();
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const userRef = collection(db, 'users');
      const userData = {
        name,
        avatar,
        email,
      };
      await addDoc(userRef, { ...userData, userId });

      setName('');
      setAvatar('');
      setEmail('');
      setPassword('');
      onClose();
      updateUser(userData);
      handleShowSuccessAlert();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      handleShowErrorAlert();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Adicionar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: '10px 0px' }}
          />
          <TextField
            label="Avatar"
            fullWidth
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="E-mail"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={errorAlert} autoHideDuration={6000} onClose={handleErrorAlertClose}>
        <MuiAlert onClose={handleErrorAlertClose} severity="error">
          Erro ao criar o usuário.
        </MuiAlert>
      </Snackbar>
      <Snackbar open={successAlert} autoHideDuration={6000} onClose={handleSuccessAlertClose}>
        <MuiAlert onClose={handleSuccessAlertClose} severity="success">
          Usuário criado com sucesso.
        </MuiAlert>
      </Snackbar>
      <Snackbar open={emptyFieldsAlert} autoHideDuration={6000} onClose={handleEmptyFieldsAlertClose}>
        <MuiAlert onClose={handleEmptyFieldsAlertClose} severity="error">
          Preencha todos os campos obrigatórios.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default UserModal;
