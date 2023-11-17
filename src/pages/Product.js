import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import Footer from '../components/Footer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BackToTop from '../components/BackToTop';
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 'R$ 19.99',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_660177-MLU70719264657_072023-F.webp',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 'R$ 29.99',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_660177-MLU70719264657_072023-F.webp',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 'R$ 39.99',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_660177-MLU70719264657_072023-F.webp',
  },{
    id: 4,
    name: 'Product 4',
    price: 'R$ 39.99',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_660177-MLU70719264657_072023-F.webp',
  },{
    id: 5,
    name: 'Product 5',
    price: 'R$ 39.99',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_660177-MLU70719264657_072023-F.webp',
  },
  {
    id: 6,
    name: 'Product 6',
    price: 'R$ 39.99',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_660177-MLU70719264657_072023-F.webp',
  },{
    id: 7,
    name: 'Product 7',
    price: 'R$ 39.99',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_660177-MLU70719264657_072023-F.webp',
  },{
    id: 8,
    name: 'Product 8',
    price: 'R$ 39.99',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_660177-MLU70719264657_072023-F.webp',
  },{
    id: 9,
    name: 'Product 9',
    price: 'R$ 39.99',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_660177-MLU70719264657_072023-F.webp',
  },
  {
    id: 10,
    name: 'Product 10',
    price: 'R$ 39.99',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_660177-MLU70719264657_072023-F.webp',
  },
];

function ProductPage() {
    
    const scroll = {
        maxHeight: '800px', // Altura máxima desejada para o scroll
        overflowY: 'auto', // Adiciona scroll vertical quando o conteúdo ultrapassa a altura máxima
  
      };

      const [whatsappMessage, setWhatsappMessage] = useState('');

  const handleWhatsappClick = (productName, imageUrl) => {
    // Substitua 'seu-numero' pelo número do WhatsApp para o qual você deseja enviar a mensagem
    const whatsappNumber = '5588981558151';
    const message = `Olá, estou interessado no produto ${productName}. Pode me fornecer mais informações?\n${imageUrl}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Atualiza o estado do componente com a mensagem do WhatsApp
    setWhatsappMessage(whatsappLink);
  };

  return (
    <Container>
      <Link
        to='/inicio'
        variant="contained"
        color="primary"
       
        style={{ marginTop: "20px", color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '18px' }}
      >
        <ArrowBackIcon style={{marginRight: '5px'}} />
        Voltar ao início
      </Link>
      <Typography
        variant="h3"
        gutterBottom
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        <ProductionQuantityLimitsIcon fontSize='large' style={{marginRight: '5px'}}/>
        Produtos
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: 10 }} style={scroll}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="200"
                image={product.imageUrl}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {product.price}
                </Typography>
                <Link to={whatsappMessage}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<WhatsAppIcon />}
                  sx={{ marginTop: 2 }}
                  onClick={() => handleWhatsappClick(product.name, product.imageUrl)}

                >
                  Fazer pedido
                </Button></Link>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
      <BackToTop/>
    </Container>
  );
}

export default ProductPage;
