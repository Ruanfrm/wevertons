import React, { useState, useEffect } from "react";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/conectionfirebase";
import EditUserModal from "./EditUserModal"; // Importe o componente EditUserModal
import EditIcon from '@mui/icons-material/Edit';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const tableCellStyle = {
  minWidth: 650,
};

const buttonStyle = {
  margin: "8px",
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // Função para buscar os usuários na base de dados.
  const getUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      const usersQuery = query(usersRef);
      const usersSnapshot = await getDocs(usersQuery);
      const userData = [];
      usersSnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(userData);
    } catch (error) {
      console.error("Erro ao buscar os usuários:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Função para excluir um usuário.
  const handleDeleteUser = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await deleteDoc(userDocRef);
      getUsers(); // Atualiza a lista após a exclusão.
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  // Função para abrir o modal de edição.
  const handleEditUser = (user) => {
    setEditUser(user);
  };

  // Função para fechar o modal de edição.
  const handleCloseEditModal = () => {
    setEditUser(null);
  };



  return (
    <div>
      <TableContainer component={Paper} style={tableCellStyle}>
        <Table aria-label="Lista de Usuários">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={buttonStyle}
                    onClick={() => handleEditUser(user)}
                  >
                    <EditIcon style={{marginRight: '5px'}}/>
                    Editar Usuario
                  </Button>
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editUser && (
        <EditUserModal
          open={!!editUser}
          onClose={handleCloseEditModal}
          user={editUser}
          onDelete={handleDeleteUser}
        />
      )}

     
    </div>
  );
};

export default UserList;
