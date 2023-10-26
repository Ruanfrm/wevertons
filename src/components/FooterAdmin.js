import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Link, IconButton, Popover, TextField, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAUYHcoYtrwXJNiXQIDhkI9eTZ2qm44caw",
    authDomain: "cardapiovirtual-d2d6b.firebaseapp.com",
    databaseURL: "https://cardapiovirtual-d2d6b-default-rtdb.firebaseio.com",
    projectId: "cardapiovirtual-d2d6b",
    storageBucket: "cardapiovirtual-d2d6b.appspot.com",
    messagingSenderId: "173010671308",
    appId: "1:173010671308:web:15fd5e2dea8851860a9469"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const footerRef = ref(db, 'footer');

export default function FooterAdmin() {
  const [footerData, setFooterData] = useState({
    socialLinks: [
      { platform: 'Facebook', url: 'https://www.facebook.com/example' },
      { platform: 'Twitter', url: 'https://twitter.com/example' },
      { platform: 'Instagram', url: 'https://www.instagram.com/example' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/example' },
    ],
    aboutUs: 'O seu destino para um visual impecável...',
    services: [
      { label: 'Cabelo', link: '#servicos' },
      { label: 'Barba', link: '#servicos' },
      { label: 'Sobrancelha', link: '#servicos' },
      { label: 'Bar', link: '#servicos' },
    ],
    usefulLinks: [
      { label: 'Preços', link: '#price' },
      { label: 'Agendar', link: 'https://sites.appbarber.com.br/barbeariadoweve-dtvx' },
      { label: 'Elogios', link: '#' },
      { label: 'Ajuda', link: '#' },
    ],
    contact: {
      address: 'Tv. José Pessoa de Queirós - Centro, Ereré - CE, 63470-000',
      email: 'info@example.com',
      phone: '+01 234 567 88',
      fax: '+01 234 567 89',
    },
    copyright: '&copy; 2023 Todos os direitos reservados, Weverton\'s Barber-Shop',
  });

  const [editItem, setEditItem] = useState(null);
  const [editValue, setEditValue] = useState('');

  const openEditModal = (item, value) => {
    setEditItem(item);
    setEditValue(value);
  };

  const closeEditModal = () => {
    setEditItem(null);
  };

  const saveEdit = () => {
    if (editItem) {
      const updatedData = { ...footerData };

      if (editItem.type === 'socialLink') {
        const index = updatedData.socialLinks.findIndex((item) => item.platform === editItem.platform);
        if (index !== -1) {
          updatedData.socialLinks[index].url = editValue;
        }
      } else if (editItem.type === 'aboutUs') {
        updatedData.aboutUs = editValue;
      } else if (editItem.type === 'service') {
        const index = updatedData.services.findIndex((item) => item.label === editItem.label);
        if (index !== -1) {
          updatedData.services[index].link = editValue;
        }
      } else if (editItem.type === 'usefulLink') {
        const index = updatedData.usefulLinks.findIndex((item) => item.label === editItem.label);
        if (index !== -1) {
          updatedData.usefulLinks[index].link = editValue;
        }
      } else if (editItem.type === 'contactInfo') {
        if (editItem.field === 'address') {
          updatedData.contact.address = editValue;
        } else if (editItem.field === 'email') {
          updatedData.contact.email = editValue;
        } else if (editItem.field === 'phone') {
          updatedData.contact.phone = editValue;
        } else if (editItem.field === 'fax') {
          updatedData.contact.fax = editValue;
        }
      } else if (editItem.type === 'copyright') {
        updatedData.copyright = editValue;
      }

      setFooterData(updatedData);
      set(footerRef, updatedData); // Salva no Firebase
      closeEditModal();
    }
  };

  useEffect(() => {
    onValue(footerRef, (snapshot) => {
      if (snapshot.exists()) {
        setFooterData(snapshot.val());
      }
    });
  }, []);

  return (
    <footer>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ padding: "1rem 0", borderBottom: "1px solid #ccc" }}
        >
          {/* Redes Sociais */}
          <Grid item xs={12} lg={6}>
            <Typography
              variant="body1"
              display="inline"
              style={{ marginRight: "1rem" }}
            >
              Conecte-se conosco nas redes sociais:
            </Typography>
            {footerData.socialLinks
              ? footerData.socialLinks.map((socialLink, index) => (
                  <div key={index}>
                    <IconButton
                      onClick={() =>
                        openEditModal(
                          { type: "socialLink", platform: socialLink.platform },
                          socialLink.url
                        )
                      }
                    >
                      {getIconComponentForPlatform(socialLink.platform)}
                    </IconButton>
                    <Link href={socialLink.url}>{socialLink.url}</Link>
                  </div>
                ))
              : null}
          </Grid>

          {/* Sobre a Empresa */}
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Sobre a Empresa
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() =>
                  openEditModal({ type: "aboutUs" }, footerData.aboutUs)
                }
              >
                {footerData.aboutUs || 'Adicionar texto'}
              </Link>
            </Typography>
          </Grid>

          {/* Serviços */}
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Serviços
            </Typography>
            {footerData.services.map((service, index) => (
              <Typography variant="body2" key={index}>
                <Link
                  onClick={() =>
                    openEditModal(
                      { type: "service", label: service.label },
                      service.link
                    )
                  }
                >
                  {service.label}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Links Úteis */}
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Links Úteis
            </Typography>
            {footerData.usefulLinks.map((usefulLink, index) => (
              <Typography variant="body2" key={index}>
                <Link
                  onClick={() =>
                    openEditModal(
                      { type: "usefulLink", label: usefulLink.label },
                      usefulLink.link
                    )
                  }
                >
                  {usefulLink.label}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Contato */}
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() =>
                  openEditModal(
                    { type: "contactInfo", field: "address" },
                    footerData.contact.address
                  )
                }
              >
                {footerData.contact.address}
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() =>
                  openEditModal(
                    { type: "contactInfo", field: "email" },
                    footerData.contact.email
                  )
                }
              >
                {footerData.contact.email}
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() =>
                  openEditModal(
                    { type: "contactInfo", field: "phone" },
                    footerData.contact.phone
                  )
                }
              >
                {footerData.contact.phone}
              </Link>
            </Typography>
            
          </Grid>
        </Grid>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            padding: "1rem 0",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="primary">
            <Link
              onClick={() =>
                openEditModal({ type: "copyright" }, footerData.copyright)
              }
            >
              {footerData.copyright}
            </Link>
          </Typography>
        </div>
      </Container>
      {/* Modal de Edição */}
      <Popover
  open={editItem !== null}
  anchorEl={editItem !== null ? document.body : null}
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <div style={{
    width: '100%', // Define a largura desejada
    padding: '2rem', // Ajusta o preenchimento para torná-lo maior
    backgroundColor: 'white', // Define a cor de fundo
    borderRadius: '8px', // Adiciona bordas arredondadas
  }}>
    <Typography variant="h6" >Editar</Typography>
    <TextField
      label="Editar Valor"
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      style={{width: '100%', margin: '10px 0px'}}
      multiline
    />
    <Button onClick={saveEdit}>Salvar</Button>
    <Button onClick={closeEditModal}>Cancelar</Button>
  </div>
</Popover>

    </footer>
  );
}

function getIconComponentForPlatform(platform) {
  switch (platform) {
    case 'Facebook':
      return <Facebook color="primary" />;
    case 'Twitter':
      return <Twitter color="primary" />;
    case 'Instagram':
      return <Instagram color="primary" />;
    case 'LinkedIn':
      return <LinkedIn color="primary" />;
    default:
      return null;
  }
}
