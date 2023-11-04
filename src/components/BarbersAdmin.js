import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Snackbar,
  IconButton,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Realtime } from '../services/conectionfirebase';
import { getDatabase, ref, push, get, child, update, remove } from 'firebase/database';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';


const BarbersAdmin = () => {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleAddBarber = async () => {
    if (!name || !imageURL) {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Preencha todos os campos.');
      setSnackbarOpen(true);
      return;
    }

    try {
      const dbRealtime = getDatabase();
      const barberRef = ref(dbRealtime, 'barbers');
      const newBarberRef = push(barberRef, {
        name: name,
        imageSrc: imageURL,
      });

      setName('');
      setImageURL('');

      setSnackbarSeverity('success');
      setSnackbarMessage('Barbeiro adicionado com sucesso.');
      setSnackbarOpen(true);
      loadBarbers();

    } catch (error) {
      console.error('Erro ao adicionar barbeiro:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Erro ao adicionar o barbeiro.');
      setSnackbarOpen(true);
    }
  };

   // Carregar a lista de barbeiros do banco de dados em tempo real
   const loadBarbers = async () => {
    try {
      const dbRealtime = getDatabase();
      const barberRef = ref(dbRealtime, 'barbers');
      const snapshot = await get(barberRef);
      if (snapshot.exists()) {
        const barbersArray = [];
        snapshot.forEach((childSnapshot) => {
          const barberData = childSnapshot.val();
          barbersArray.push({ id: childSnapshot.key, ...barberData });
        });
        setBarbers(barbersArray);
      }
    } catch (error) {
      console.error('Erro ao carregar barbeiros:', error);
    }
  };

  useEffect(() => {
    loadBarbers();
  }, []);


  // Carregar a lista de barbeiros do banco de dados em tempo real
  useEffect(() => {
    const loadBarbers = async () => {
      try {
        const dbRealtime = getDatabase();
        const barberRef = ref(dbRealtime, 'barbers');
        const snapshot = await get(barberRef);
        if (snapshot.exists()) {
          const barbersArray = [];
          snapshot.forEach((childSnapshot) => {
            const barberData = childSnapshot.val();
            barbersArray.push({ id: childSnapshot.key, ...barberData });
          });
          setBarbers(barbersArray);
        }
      } catch (error) {
        console.error('Erro ao carregar barbeiros:', error);
      }
    };

    loadBarbers();
  }, []);

  const handleEditBarber = (barber) => {
    setSelectedBarber(barber);
    setName(barber.name);
    setImageURL(barber.imageSrc);
  };

  const handleDeleteBarber = async (barber) => {
    try {
      const dbRealtime = getDatabase();
      const barberRef = ref(dbRealtime, `barbers/${barber.id}`);
      await remove(barberRef);

      setSnackbarSeverity('success');
      setSnackbarMessage('Barbeiro excluído com sucesso.');
      setSnackbarOpen(true);

      // Remova o item da lista local
      setBarbers((prevBarbers) => prevBarbers.filter((b) => b.id !== barber.id));
    } catch (error) {
      console.error('Erro ao excluir barbeiro:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Erro ao excluir o barbeiro.');
      setSnackbarOpen(true);
    }
  };

  const handleCancelEdit = () => {
    setSelectedBarber(null);
    setName('');
    setImageURL('');
  };

  const handleUpdateBarber = async () => {
    if (!selectedBarber) return;

    try {
      const dbRealtime = getDatabase();
      const barberRef = ref(dbRealtime, `barbers/${selectedBarber.id}`);
      await update(barberRef, {
        name: name,
        imageSrc: imageURL,
      });

      setSnackbarSeverity('success');
      setSnackbarMessage('Barbeiro atualizado com sucesso.');
      setSnackbarOpen(true);

      // Atualize o item na lista local
      setBarbers((prevBarbers) =>
        prevBarbers.map((b) =>
          b.id === selectedBarber.id ? { ...b, name, imageSrc: imageURL } : b
        )
      );

      setSelectedBarber(null);
      setName('');
      setImageURL('');
    } catch (error) {
      console.error('Erro ao atualizar barbeiro:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Erro ao atualizar o barbeiro.');
      setSnackbarOpen(true);
    }
  };

  

  return (
    <Container sx={{ background: 'white', marginLeft: '25px', borderRadius: '10px', color: 'black', marginTop: '20px' }}  >
      <Typography variant="h4" align="center" gutterBottom fontWeight='bold'>
        Adicionar Barbeiros
      </Typography>
      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel>Nome do Barbeiro</InputLabel>
          <Input value={name} onChange={handleNameChange} />
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel>URL da Imagem</InputLabel>
          <Input value={imageURL} onChange={handleImageURLChange} />
        </FormControl>
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        {selectedBarber ? (
          <>
            <Button variant="contained" color="primary" onClick={handleUpdateBarber} style={{marginRight: '5px'}}>
              Atualizar Barbeiro
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancelEdit}>
              Cancelar Edição
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddBarber}>
          <AddIcon style={{marginRight: '10px'}}/>
            Adicionar Barbeiro
          </Button>
        )}
      </Box>
      <TableContainer style={{ maxHeight: '600px', overflowY: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {barbers.map((barber) => (
              <TableRow key={barber.id} >
                <TableCell>{barber.name}</TableCell>
                <TableCell>{barber.imageSrc}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEditBarber(barber)} style={{marginBottom: '5px'}}>
                    <ModeEditIcon/>
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteBarber(barber)}>
                    <DeleteForeverIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BarbersAdmin;
