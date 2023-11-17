import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RocketIcon from '@mui/icons-material/Rocket';
import { Tooltip } from '@mui/material';

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Tooltip title="Voltar ao Topo">
    <Fab
      color="primary"
      aria-label="Voltar ao Topo"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '23px',
        display: showButton ? 'block' : 'none',
      }}
      onClick={scrollToTop}
    >
      <RocketIcon />
    </Fab>

    </Tooltip>
    
  );
};

export default BackToTop;
