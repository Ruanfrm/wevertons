import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from "firebase/app";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAUYHcoYtrwXJNiXQIDhkI9eTZ2qm44caw",
  authDomain: "cardapiovirtual-d2d6b.firebaseapp.com",
  databaseURL: "https://cardapiovirtual-d2d6b-default-rtdb.firebaseio.com",
  projectId: "cardapiovirtual-d2d6b",
  storageBucket: "cardapiovirtual-d2d6b.appspot.com",
  messagingSenderId: "173010671308",
  appId: "1:173010671308:web:15fd5e2dea8851860a9469"
};
function ImageList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Inicialize o Firebase (certifique-se de que sua configuração do Firebase esteja correta)
    initializeApp(firebaseConfig);

    // Inicialize o Firebase Storage
    const storage = getStorage();

    // Referência ao diretório de imagens no Firebase Storage
    const imagesRef = ref(storage, 'imagens/barber');

    // Lista todas as imagens no diretório
    listAll(imagesRef)
      .then((result) => {
        const imagePromises = result.items.map((imageRef) =>
          getDownloadURL(imageRef)
        );
        Promise.all(imagePromises).then((downloadURLs) => {
          setImages(downloadURLs);
        });
      })
      .catch((error) => {
        console.error('Erro ao buscar imagens:', error);
      });
  }, []);

  return (
    <div id='trabalhos'>
      <h3 className='title-servicos'>Alguns Trabalhos</h3>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card>
              <CardMedia
                component='img'
                alt={`Image ${index + 1}`}
                height='200'
                image={image}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ImageList;
