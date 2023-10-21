import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function PasswordModal({ open, onClose, onChangePassword }) {
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    if (newPassword) {
      onChangePassword(newPassword);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Alterar Senha</DialogTitle>
      <DialogContent>
        <TextField
          label="Nova Senha"
          fullWidth
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleChangePassword} color="primary">
          Alterar Senha
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PasswordModal;
