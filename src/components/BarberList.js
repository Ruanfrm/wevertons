import React, { useState, useEffect } from 'react';
import BarberCard from './BarberCard';
import { getDatabase, ref, get } from 'firebase/database';

const BarberList = () => {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    const loadBarbers = async () => {
      const dbRealtime = getDatabase();
      const barbersRef = ref(dbRealtime, 'barbers');

      try {
        const snapshot = await get(barbersRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const barberArray = Object.values(data);

          setBarbers(barberArray);
        }
      } catch (error) {
        console.error('Erro ao carregar barbeiros:', error);
      }
    };

    loadBarbers();
  }, []);

  return (
    <div style={{marginBottom: '20px'}}>
      <h3 className='title' style={{ textAlign: 'center' }}>Barbeiros</h3>
      <div className="barber-list">
        {barbers.map((barber, index) => (
          <BarberCard key={index} name={barber.name} imageSrc={barber.imageSrc} />
        ))}
      </div>
    </div>
  );
};

export default BarberList;
