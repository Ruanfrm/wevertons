import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../services/conectionfirebase";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const EditUserModal = ({ open, onClose, user, onDelete }) => {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [email, setEmail] = useState(user.email);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleUpdateUser = async () => {
    try {
      const userDocRef = doc(db, "users", user.id);
      await setDoc(userDocRef, { name, avatar, email }, { merge: true });
      setSuccessAlert(true)
      console.log('Usuario atualizado com sucesso')
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      setErrorAlert(true);
    }
  };

  const handleDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const userDocRef = doc(db, "users", user.id);
      await deleteDoc(userDocRef);
      setSuccessAlert(true);
      console.log('Usuario Deletado com sucesso')

      setDeleteConfirmationOpen(false);
      onDelete(user.id); // Remove o usuário após a confirmação.
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
      setErrorAlert(true);
      setDeleteConfirmationOpen(false);
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleAlertClose = () => {
    setErrorAlert(false);
    setSuccessAlert(false);
  };

  console.log("errorAlert:", errorAlert);
  console.log("successAlert:", successAlert);

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: "10px 0px" }}
          />
          <TextField
            label="Avatar"
            fullWidth
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="E-mail"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Atualizar
          </Button>
          <Button onClick={handleDeleteConfirmation} color="secondary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir este usuário?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={errorAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <MuiAlert onClose={handleAlertClose} severity="error">
          Ocorreu um erro.
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={successAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <MuiAlert onClose={handleAlertClose} severity="success">
          Ação realizada com sucesso.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default EditUserModal;
