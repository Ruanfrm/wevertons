import './error.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import logo from "../../imagens/logo.png"
import CachedIcon from '@mui/icons-material/Cached';

export default function Error() {
  return (
    <div className='error'>
        <h1>
            Pagina não encontrada!
        </h1>
        <p>A pagina que está procurando não existe</p>
        <img src={logo} />
        <Link to="/" className='link' ><Button className='button' variant="contained" disableElevation>
          Voltar para Home
          <CachedIcon className='icon'/>
    </Button></Link>

    </div> 
  )
}