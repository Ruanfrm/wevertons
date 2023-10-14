import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Agendar() {
  return (
    <Stack spacing={2} direction="row" className='agendar'>
      <Button variant="contained" size='medium' href="https://sites.appbarber.com.br/barbeariadoweve-dtvx" target="_blank">Agendar um horário</Button>
    </Stack>
  );
}