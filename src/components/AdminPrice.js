import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  Modal,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, update, remove, onValue } from 'firebase/database';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import stylist from '../imagens/stylist.png';

const firebaseConfig = {
    apiKey: "AIzaSyAUYHcoYtrwXJNiXQIDhkI9eTZ2qm44caw",
    authDomain: "cardapiovirtual-d2d6b.firebaseapp.com",
    databaseURL: "https://cardapiovirtual-d2d6b-default-rtdb.firebaseio.com",
    projectId: "cardapiovirtual-d2d6b",
    storageBucket: "cardapiovirtual-d2d6b.appspot.com",
    messagingSenderId: "173010671308",
    appId: "1:173010671308:web:15fd5e2dea8851860a9469"
  };

const AdminPrice = () => {
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [services, setServices] = useState([]);
  const [editServiceKey, setEditServiceKey] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const servicesRef = ref(db, 'precos');

    onValue(servicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const servicesList = Object.entries(data).map(([key, value]) => ({ key, ...value }));
        setServices(servicesList);
      }
    });
  }, []);

  const clearFields = () => {
    setServiceName('');
    setServicePrice('');
  };

  const handleAddService = () => {
    if (!serviceName || !servicePrice) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const servicesRef = ref(db, 'precos');

    const newService = {
      service: serviceName,
      price: servicePrice,
      icon: stylist, // Substitua pela URL do ícone da barbearia
    };

    push(servicesRef, newService);

    setSuccess('Serviço adicionado com sucesso.');
    clearFields();
  };

  const handleEditService = () => {
    if (!serviceName || !servicePrice) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (editServiceKey) {
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const servicesRef = ref(db, `precos/${editServiceKey}`);

      const updatedService = {
        service: serviceName,
        price: servicePrice,
        icon: stylist, // Substitua pela URL do ícone da barbearia
      };

      update(servicesRef, updatedService);

      setSuccess('Serviço editado com sucesso.');
      clearFields();
      setEditServiceKey(null);

      setServiceName('');
      setServicePrice('');

    }
  };

  const handleDeleteService = (key) => {
    setDeleteConfirmation(key);
  };

  const confirmDeleteService = () => {
    if (deleteConfirmation) {
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const servicesRef = ref(db, `precos/${deleteConfirmation}`);

      remove(servicesRef);

      setSuccess('Serviço excluído com sucesso.');
      setDeleteConfirmation(null);
    }
  };

  const handleEditClick = (key, service, price) => {
    setEditServiceKey(key);
    setServiceName(service);
    setServicePrice(price);
  };

  const handleCancelEdit = () => {
    setEditServiceKey(null)
    setServiceName('');
    setServicePrice('');
  };

  return (
    <Container style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginTop: '20px', marginLeft:'25px'}}>
      <Typography variant="h4" align="center" gutterBottom style={{color: '#000', fontWeight: 'bold'}}>
        Adicionar Preços
      </Typography>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="Nome do Serviço"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          style={{ marginBottom: '10px', width: '100%'}}
        />
        <TextField
          label="Preço"
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)}
          style={{ marginBottom: '10px',  width: '100%'}}
        />
        <ButtonGroup>
          {editServiceKey ? (
            <>
              <Button variant="contained" onClick={handleEditService} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <EditIcon style={{marginRight: '10px'}}/>
                Editar Serviço
              </Button>
              <Button variant="contained" onClick={handleCancelEdit} style={{marginLeft: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CancelIcon style={{marginRight: '10px'}}/>
                Cancelar Edição
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleAddService}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <AddIcon style={{marginRight: '10px'}}/>
              Adicionar Serviço
            </Button>
          )}
        </ButtonGroup>
      </form>
      <List style={{ maxHeight: '600px', overflowY: 'auto'}}>
        {services.map((service) => (
          <Card key={service.key} style={{ marginBottom: '10px' }}>
            <CardContent>
              <ListItem>
                <ListItemText primary={service.service} secondary={service.price} />
                <ButtonGroup>
                  <Button variant="outlined" onClick={() => handleEditClick(service.key, service.service, service.price)} 
                  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                  >
                    <EditIcon style={{marginRight: '10px'}}/>
                    Editar
                  </Button>
                  <Button variant="outlined" onClick={() => handleDeleteService(service.key)}
                  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                  >
                    <DeleteForeverIcon style={{marginRight: '10px'}}/>
                    Excluir
                  </Button>
                </ButtonGroup>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success !== null}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Modal
        open={deleteConfirmation !== null}
        onClose={() => setDeleteConfirmation(null)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card >
          <CardContent >
            <Typography variant="h6">Confirmar Exclusão</Typography>
            <Typography>Tem certeza de que deseja excluir este serviço?</Typography>
          </CardContent>
          <ButtonGroup style={{padding: '20px'}}>
            <Button variant="contained" onClick={confirmDeleteService}  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              Confirmar
              <ThumbUpAltIcon style={{marginLeft: '10px'}}/>
            </Button>
            <Button variant="outlined" onClick={() => setDeleteConfirmation(null)}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              Cancelar
              <CancelIcon style={{marginLeft: '10px'}}/>

            </Button>
          </ButtonGroup>
        </Card>
      </Modal>
    </Container>
  );
};

export default AdminPrice;
