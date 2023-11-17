import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, GitHub } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import PrintIcon from '@mui/icons-material/Print';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';





export default function Footer() {

  const [footerData, setFooterData] = useState({
    socialLinks: [],
    aboutUs: '',
    services: [],
    usefulLinks: [],
    contact: {
      address: '',
      email: '',
      phone: '',
      fax: '',
    },
    copyright: '',
  });


  useEffect(() => {
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
    // Assine as alterações nos dados do Firebase
    onValue(footerRef, (snapshot) => {
      if (snapshot.exists()) {
        setFooterData(snapshot.val());
      }
    });
  }, []); // O ar


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
            {footerData.socialLinks &&
              footerData.socialLinks.map((socialLink, index) => (
                 
                  <Link 
                  key={index}
                    href={socialLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                     <IconButton>
                    {getIconComponentForPlatform(socialLink.platform)}
                  </IconButton>
                  </Link>
              ))}
          </Grid>
        </Grid>

        <Grid container spacing={4} style={{ paddingTop: "2rem" }}>
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Weverton's Barber-Shop
            </Typography>
            <Typography variant="body2">{footerData.aboutUs}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Serviços
            </Typography>
            {footerData.services.map((service, index) => (
              <Typography variant="body2" key={index}>
                <Link href={service.link} style={{ textDecoration: "none" }}>
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
                <Link href={usefulLink.link} style={{ textDecoration: "none" }}>
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
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <LocationOnIcon style={{ marginRight: "8px" }} />
                <Link
                  href='https://www.google.com/maps?ll=-6.031207,-38.347864&z=19&t=m&hl=pt-BR&gl=BR&mapclient=embed&cid=17858290782253684466'
                  style={{ textDecoration: "none", color: "#939ba5" }}
                >
                {footerData.contact.address}
                </Link>
              </span>
            </Typography>
            <Typography variant="body2">
              <span style={{ display: "flex", alignItems: "center" }}>
                {" "}
                <MailOutlineIcon
                  style={{ marginRight: "8px", marginTop: "5px" }}
                />
                <Link
                  href={`mailto:${footerData.contact.email}`}
                  style={{ textDecoration: "none", color: "#939ba5" }}
                >
                  {footerData.contact.email}
                </Link>
              </span>
            </Typography>
            <Typography variant="body2">
              <span style={{ display: "flex", alignItems: "center" }}>
                {" "}
                <PhoneIcon style={{ marginRight: "8px", marginTop: "5px" }} />
                <Link
                  href={`tel:${footerData.contact.phone}`}
                  style={{ textDecoration: "none", color: "#939ba5" }}
                >
                  {footerData.contact.phone}
                </Link>
              </span>
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
          {footerData.copyright}
          </Typography>
        </div>
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