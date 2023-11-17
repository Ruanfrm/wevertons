import React from 'react';

const BarberCard = ({ name, imageSrc }) => {
  return (
    <div className="barber-card">
      <img src={imageSrc} alt={name} className="barber-image" />
      <div className="barber-info">
        <h2 className="barber-name">{name}</h2>
      </div>
    </div>
  );
};

export default BarberCard;
