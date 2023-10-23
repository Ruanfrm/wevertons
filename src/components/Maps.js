import React from 'react';
import Iframe from 'react-iframe';
import MapIcon from '@mui/icons-material/Map';
const MapComponent = () => {
  return (
    <div>
        <h1 className='title-map' style={{textAlign: 'center'}}>
            Como chegar?
            <MapIcon fontSize='large' style={{marginLeft: '10px'}}/>
            </h1>
      <Iframe
        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d605.4205170303344!2d-38.348444474478626!3d-6.031285525171406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7bb495fac16a7d1%3A0xf7d564d963dd16f2!2sWeverton%27S%20barbershop!5e0!3m2!1spt-BR!2sbr!4v1698063285548!5m2!1spt-BR!2sbr"
        width="100%"
        height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        styles={{borderRadius: '5px'}}
      />
    </div>
  );
};

export default MapComponent;
