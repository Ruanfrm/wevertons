import { useState, useEffect } from 'react';
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import emailjs from '@emailjs/browser';
import DraftsIcon from '@mui/icons-material/Drafts';

function Contato() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    if (notificationType) {
      const timer = setTimeout(() => {
        setNotificationType(null);
      }, 7000); // Define o tempo em milissegundos (10 segundos)

      return () => clearTimeout(timer);
    }
  }, [notificationType]);

  function sendEmail(e) {
    e.preventDefault();

    if (name === '' || email === '' || message === '') {
      setNotificationType('warning');
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email,
    };

    emailjs
      .send('service_ogrzqhs', 'template_kpl59p8', templateParams, '_UgPXQRrzIF5pUd3N')
      .then((res) => {
        console.log('email enviado', res.status, res.text);
        setName('');
        setEmail('');
        setMessage('');
        setNotificationType('success');
      })
      .catch((err) => {
        console.log('ERRO', err);
        setNotificationType('error');
      });
  }

  return (
    <div className="container-contato" id="contato">
      <h1 className="title">Contato <DraftsIcon sx={{ fontSize: 40 }} className='icone-contato'/></h1>

      <Stack sx={{ width: '100%' }} spacing={2} className='container-alertas'>
        {notificationType === 'error' && (
          <Alert severity="error">
            <AlertTitle>Error ao enviar e-mail</AlertTitle>
            Houve um erro ao enviar o e-mail. Por favor, verifique seus dados e tente novamente.
          </Alert>
        )}
        {notificationType === 'success' && (
          <Alert severity="success">
            <AlertTitle>E-mail enviado com sucesso</AlertTitle>
            Seu e-mail foi enviado com sucesso — <strong>Obrigado pelo feedback!</strong>
          </Alert>
        )}
         {notificationType === 'warning' && (
      <Alert severity="warning">
        <AlertTitle>Preencha todos os campos</AlertTitle>
       Alguns campos ficaram vazios — <strong>Preencha todos os campos para realizar o envio!</strong>
      </Alert>
        )}


      </Stack>

      <form className="form" onSubmit={sendEmail}>
      <input
          className="input"
          type="text"
          placeholder="Digite seu nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          className="input"
          type="text"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <textarea
          className="textarea"
          placeholder="Digite sua mensagem..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <input className="button" type="submit" value="Enviar" />      </form>

      
    </div>
  );
}

export default Contato;
