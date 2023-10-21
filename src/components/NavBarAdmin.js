import React, { useState } from "react";
import { useAuth } from '../services/conectionfirebase'; // Certifique-se de importar o serviço de autenticação apropriado

const NavBarAdmin = () => {
  const { user, updatePassword, logout } = useAuth(); // Certifique-se de ter as funções apropriadas no seu serviço de autenticação
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangePassword = async () => {
    try {
      await updatePassword(newPassword);
      alert("Senha alterada com sucesso!");
      setIsChangingPassword(false);
      setNewPassword("");
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
    }
  };

  return (
    <div className="navbar">
      {user && (
        <div className="user-info">
          <img src={user.avatar} alt="Avatar" />
          <div className="user-details">
            <p>Nome: {user.name}</p>
            <p>E-mail: {user.email}</p>
          </div>
        </div>
      )}

      {isChangingPassword ? (
        <div className="change-password">
          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleChangePassword}>Salvar Senha</button>
        </div>
      ) : (
        <button onClick={() => setIsChangingPassword(true)}>Alterar Senha</button>
      )}

      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default NavBarAdmin;
