import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Link, IconButton, Popover, TextField, Button, Tooltip } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
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
      { label: 'Termos de uso', link: '/termos' },
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
    copyright: '© 2023 Todos os direitos reservados, Weverton\'s Barber-Shop',
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
          <Grid item xs={12} lg={6}>
            <Typography
              variant="body1"
              display="inline"
              style={{ marginRight: ".5rem" }}
            >
              Conecte-se conosco nas redes sociais:
            </Typography>
            {footerData.socialLinks
              ? footerData.socialLinks.map((socialLink, index) => (
                <Tooltip title={socialLink.url}>
                    <IconButton
                    key={index}
                      onClick={() =>
                        openEditModal(
                          { type: "socialLink", platform: socialLink.platform },
                          socialLink.url
                        )
                      }
                    >
                      
                      {getIconComponentForPlatform(socialLink.platform)}
                      <EditIcon fontSize='10px' style={{color: '#fff'}}/>
                    </IconButton>
                    </Tooltip>
                ))
              : null}
          </Grid>
        </Grid>

        <Grid container spacing={4} style={{ paddingTop: "2rem" }}>
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Weverton's Barber-Shop
            </Typography>
            <Typography variant="body2">
              <Link
                onClick={() =>
                  openEditModal({ type: "aboutUs" }, footerData.aboutUs)
                }
                style={{textDecoration:'none'}}
              >
                <Tooltip title="Editar">
              <EditIcon fontSize='large' style={{color: '#fff'}}/>
                </Tooltip>
                {footerData.aboutUs || 'Adicionar texto'}
              </Link>

            </Typography>         
             </Grid>
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
                  style={{textDecoration: 'none'}}
                >
                  <Tooltip title="Editar">
              <EditIcon fontSize='small' style={{color: '#fff'}}/>
                </Tooltip>
                  {service.label}
                </Link>
              </Typography>
            ))}
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Links úteis
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
                  style={{textDecoration: 'none'}}

                >
                   <Tooltip title="Editar">
              <EditIcon fontSize='small' style={{color: '#fff'}}/>
                </Tooltip>
                  {usefulLink.label}
                </Link>
              </Typography>
            ))}
          </Grid>
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
                style={{textDecoration: 'none'}}

              >
                {footerData.contact.address}
                <Tooltip title="Editar">
              <EditIcon fontSize='small' style={{color: '#fff', marginLeft: '10px'}}/>
                </Tooltip>
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
                style={{textDecoration: 'none'}}

              >
                {footerData.contact.email}
                <Tooltip title="Editar">
              <EditIcon fontSize='small' style={{color: '#fff', marginLeft: '10px'}}/>
                </Tooltip>
              </Link>
            </Typography>
            <Typography variant="body2" >
              <Link
                onClick={() =>
                  openEditModal(
                    { type: "contactInfo", field: "phone" },
                    footerData.contact.phone
                  )
                }
                style={{textDecoration: 'none'}}

              >
                {footerData.contact.phone}
                <Tooltip title="Editar">
              <EditIcon fontSize='small' style={{color: '#fff', marginLeft: '10px'}}/>
                </Tooltip>
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
              style={{textDecoration: 'none'}}

            >
              {footerData.copyright}
              <Tooltip title="Editar">
              <EditIcon fontSize='small' style={{color: '#fff', marginLeft: '10px'}}/>
                </Tooltip>
            </Link>
          </Typography>
        </div>


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
      </Container>
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
