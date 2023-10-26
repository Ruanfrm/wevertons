import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemIcon, Grid } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAUYHcoYtrwXJNiXQIDhkI9eTZ2qm44caw",
  authDomain: "cardapiovirtual-d2d6b.firebaseapp.com",
  databaseURL: "https://cardapiovirtual-d2d6b-default-rtdb.firebaseio.com",
  projectId: "cardapiovirtual-d2d6b",
  storageBucket: "cardapiovirtual-d2d6b.appspot.com",
  messagingSenderId: "173010671308",
  appId: "1:173010671308:web:15fd5e2dea8851860a9469"
};

const Price = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    // Inicialize o app Firebase com a configuração
    const app = initializeApp(firebaseConfig);

    // Referência ao seu banco de dados Realtime Database
    const db = getDatabase(app);
    const databaseRef = ref(db, 'precos'); // Substitua 'precos' pelo caminho correto no seu banco de dados Firebase.

    // Assine as mudanças no banco de dados em tempo real
    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const priceList = Object.values(data);
        setPrices(priceList);
      }
    });

    return () => {
      // Não é necessário desligar a assinatura no Firebase 9.
    };
  }, []);

  return (
    <div id='price'>
      <h4 variant='h4' className='title-price'>Preços</h4>
      <Grid container spacing={1}>
        {prices.map((item, index) => (
          <Grid item xs={6} sm={6} md={2} key={index}>
            <ListItem>
              <ListItemIcon>
                <img src={item.icon} style={{ width: '40px' }} alt='Ícone de barbearia' />
              </ListItemIcon>
              <ListItemText primary={item.service} secondary={"R$ " + item.price} />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Price;
