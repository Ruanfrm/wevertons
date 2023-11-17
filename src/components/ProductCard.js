// src/components/ProductCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

function ProductCard({ product, onAddToCart }) {
  return (
    <Card>
      <CardMedia component="img" alt={product.name} height="140" image={product.imageUrl} />
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography color="text.secondary">{product.description}</Typography>
        <Typography variant="h6" color="text.primary">
          ${product.price.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCart />}
          sx={{ marginTop: 2 }}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
        <IconButton color="primary" aria-label="add to favorites" sx={{ float: 'right' }}>
          <ShoppingCart />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
