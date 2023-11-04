import React from 'react';
import { useMediaQuery } from '@mui/material';

import cabelo from '../imagens/cabelo.png';
import bar from '../imagens/Bar.png';
import quimica from '../imagens/quimica.png';
import pezinho from '../imagens/pezinho.png';
import sombrancelha from '../imagens/sombrancelha.png';
import barba from '../imagens/barba.png';

export default function Servicos() {
  const weverton_page = "https://sites.appbarber.com.br/barbeariadoweve-dtvx";
  const isMobile = useMediaQuery('(max-width:600px)');

  const servicosStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)', // 3 imagens por linha em telas grandes
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px', // Espaço entre as imagens
  };

  const cardServicoStyle = {
    textAlign: 'center',
  };

  const imgServicosStyle = {
    width: '50%',
  };

  return (
    <section id="servicos">
      <h1 className="h1-serv">Nossos serviços</h1>
      <div style={servicosStyle}>
        <div style={cardServicoStyle}>
          <a href={weverton_page}>
            <img src={cabelo} alt="cabelo" style={imgServicosStyle} />
          </a>
          <p className='pagagrafo-servicos'>Cabelo</p>
        </div>
        <div style={cardServicoStyle}>
          <a href={weverton_page}>
            <img src={barba} alt="barba" style={imgServicosStyle} />
          </a>
          <p className='pagagrafo-servicos'>Barba</p>
        </div>
        <div style={cardServicoStyle}>
          <a href={weverton_page}>
            <img src={quimica} alt="quimica" style={imgServicosStyle} />
          </a>
          <p className='pagagrafo-servicos'>Pigmentação</p>
        </div>
        <div style={cardServicoStyle}>
          <a href={weverton_page}>
            <img src={pezinho} alt="pezinho" style={imgServicosStyle} />
          </a>
          <p className='pagagrafo-servicos'>Pezinho</p>
        </div>
        <div style={cardServicoStyle}>
          <a href={weverton_page}>
            <img src={sombrancelha} alt="sombrancelha" style={imgServicosStyle} />
          </a>
          <p className='pagagrafo-servicos'>Sobrancelha</p>
        </div>
        <div style={cardServicoStyle}>
          <a href={weverton_page}>
            <img src={bar} alt="bar" style={imgServicosStyle} />
          </a>
          <p className='pagagrafo-servicos'>Bar</p>
        </div>
      </div>
    </section>
  );
}
