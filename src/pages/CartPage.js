// src/pages/CartPage.js
import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

function CartPage({ cartItems, onRemoveFromCart }) {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item key={item.product.id} xs={12} md={6}>
              <Card>
                <CardMedia component="img" alt={item.product.name} height="140" image={item.product.imageUrl} />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.product.name}
                  </Typography>
                  <Typography color="text.secondary">{item.product.description}</Typography>
                  <Typography variant="h6" color="text.primary">
                    ${item.product.price.toFixed(2)}
                  </Typography>
                  <Button variant="outlined" color="secondary" onClick={() => onRemoveFromCart(item)}>
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default CartPage;
