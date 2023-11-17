// src/components/ShoppingCartIcon.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

function ShoppingCartIcon({ itemCount }) {
  return (
    <Link to="/cart" style={{ marginLeft: '20px' }}>
      <Badge badgeContent={itemCount} color="primary">
        <IconButton color="primary">
          <ShoppingCart />
        </IconButton>
      </Badge>
    </Link>
  );
}

export default ShoppingCartIcon;
