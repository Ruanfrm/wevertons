import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import UserList from "./UserList"; // Importe o componente UserList

const UserListModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Lista de Usuários</DialogTitle>
      <DialogContent>
        <UserList />
      </DialogContent>
    </Dialog>
  );
};

export default UserListModal;
