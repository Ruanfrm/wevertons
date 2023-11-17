import React, { useState, useEffect } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import {
  Paper,
  Typography,
  Container,
  Box,
  Rating,
  Avatar,
  Grid,
  Pagination,
} from '@mui/material';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    background: 'transparent', // Define o fundo como transparente

  },
  feedbackPaper: {
    background: 'rgba(255, 255, 255, 0.8)', // Define um fundo com transparência
    padding: '20px',
  },
  comment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: '0px 8px',
  },
};

function Feedback() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetch(
      `https://ws.appbeleza.com.br/Service.php?empresa=4089134&metodo=buscaPessoaAvaliacao&pages=${page}&tipo=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result && Array.isArray(data.result)) {
          setFeedbackData(data.result);
        } else {
          console.error('Resposta inválida da API:', data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar feedbacks:', error);
        setLoading(false);
      });
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (

    <div className='feedback' id='feedback'>
        <h3 className='title-feedback'>Feedback dos Clientes</h3>
 <Container maxWidth="ml" style={styles.container} className='Container'>
      <Paper elevation={3} style={styles.feedbackPaper}>
        <Typography variant="h5" gutterBottom style={styles.comment}>
          Comentários <CommentIcon style={styles.icon}/>
        </Typography>
        {loading ? (
          <Typography variant="body1">Carregando feedbacks...</Typography>
        ) : feedbackData.length === 0 ? (
          <Typography variant="body1">Nenhum feedback disponível.</Typography>
        ) : (
          <Grid container spacing={2}>
            {feedbackData.map((feedback, index) => (
              <Grid item xs={12} sm={6} md={4} key={feedback.Codigo}>
                <Box display="flex" alignItems="center">
                  <Avatar alt={feedback.Nome} src={feedback.Imagem} />
                  <Box ml={2}>
                    <Typography variant="subtitle1">{feedback.Nome}</Typography>
                    <Rating name="rating" value={parseFloat(feedback.Nota)} precision={0.5} readOnly />
                    <Typography variant="body2">{feedback.DataAvaliacao}</Typography>
                    <Typography variant="body1">{feedback.Comentario}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(feedbackData.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Paper>
    </Container>
    </div>
   
  );
}

export default Feedback;
