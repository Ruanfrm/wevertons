import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref } from "firebase/database";
import { db, auth } from "../services/conectionfirebase"; // Certifique-se de que isso importa o banco de dados corretamente
import { getFirestore, collection, addDoc } from "firebase/firestore";


import Dialog from "@mui/material/Dialog"; // Importe o Dialog do Material-UI
import DialogTitle from "@mui/material/DialogTitle"; // Importe o DialogTitle do Material-UI
import DialogContent from "@mui/material/DialogContent"; // Importe o DialogContent do Material-UI
import TextField from "@mui/material/TextField"; // Importe o TextField do Material-UI
import DialogActions from "@mui/material/DialogActions"; // Importe o DialogActions do Material-UI
import Button from "@mui/material/Button"; // Importe o Button do Material-UI


const UserModal = ({ open, onClose, onAddUser }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleAddUser = async () => {
    try {
      // Crie um usuário com e-mail e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Obtenha o ID do usuário criado
      const userId = userCredential.user.uid;

      // Adicione os dados do usuário ao Firestore
      const userRef = collection(db, "users");
      const userData = {
        name,
        avatar,
        email,
        // Adicione outros campos, se necessário
      };

      await addDoc(userRef, { ...userData, userId });

      // Limpe os campos e feche o modal
      setName('');
      setAvatar('');
      setEmail('');
      setPassword('');
      onClose();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>Adicionar Usuário</DialogTitle>
    <DialogContent>
      <TextField
        label="Nome"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{margin: '10px 0px'}}
      />
      <TextField
        label="Avatar"
        fullWidth
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        style={{marginBottom: '10px'}}
      />
      <TextField
        label="E-mail"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{marginBottom: '10px'}}
      />
      <TextField
        label="Senha"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{marginBottom: '10px'}}
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
  </Dialog>  );
};

export default UserModal;
