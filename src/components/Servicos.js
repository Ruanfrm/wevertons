import cabelo from '../imagens/cabelo.png';
import bar from '../imagens/Bar.png';
import quimica from '../imagens/quimica.png';
import pezinho from '../imagens/pezinho.png';
import sombrancelha from '../imagens/sombrancelha.png';
import barba from '../imagens/barba.png';

export default function Servicos() {

  const weverton_page = "https://sites.appbarber.com.br/barbeariadoweve-dtvx"

  return(
    <section id="servicos" className="h-screen mobile:h-[60rem] tablet:h-[50rem]">
      <h1 className="h1-serv">Nossos serviços</h1>
      <div className="md:h-[24rem] md:w-[600px] m-auto flex flex-col items-center">
        <ul className="flex flex-wrap justify-around">
          <li className="card-serviço">
          <a href={weverton_page}>
            <img src={cabelo} alt="cabelo" className='img-servicos' />
            </a>
            <p className='pagagrafo-servicos'>Cabelo</p>
          </li>
          <li className="card-serviço">
            <a href={weverton_page}>
            <img  src={barba} alt="barba" className='img-servicos' />
            </a>
            <p className='pagagrafo-servicos'>barba</p>
          </li>
          <li className="card-serviço">
          <a href={weverton_page}>
            <img  src={quimica} alt="quimica" className='img-servicos' />
            </a>
            <p className='pagagrafo-servicos'>Pigmentação</p>
          </li>
          <li className="card-serviço">
          <a href={weverton_page}>
            <img  src={pezinho} alt="pezinho" className='img-servicos' />
            </a>
            <p className='pagagrafo-servicos'>pezinho</p>
          </li>
          <li className="card-serviço">
          <a href={weverton_page}>
            <img  src={sombrancelha} alt="sombrancelha" className='img-servicos' />
            </a>
            <p className='pagagrafo-servicos'>sombrancelha</p>
          </li>
          <li className="card-serviço">
          <a href={weverton_page}>
            <img  src={bar} alt="bar" className='img-servicos' />
            </a>
            <p className='pagagrafo-servicos'>bar</p>
          </li>
        </ul>
    
      </div>
    </section>
  )
}