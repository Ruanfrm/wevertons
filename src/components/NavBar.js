// Navbar.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from "../imagens/logo.png"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#"> 
        <img src={logo} />
        </a>
      </div>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="https://sites.appbarber.com.br/barbeariadoweve-dtvx" target='_blank'>Agendar</a></li>
          <li><a href="#trabalhos">Trabalhos</a></li>
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="/produtos">Produtos</a></li>
          <li><a href="#maps">Como chegar?</a></li>


        </ul>
      </div>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>
    </nav>
  );
}

export default Navbar;
