import React from 'react'
import Agendar from "../components/Agendar"
import Navbar from "../components/NavBar"
import Servicos from "../components/Servicos"
import Trabalhos from '../components/Trabalhos'
import Sobre from '../components/Sobre'
import Contato from '../components/Contato'
import BackToTop from '../components/BackToTop'
import Maps from '../components/Maps'
import Feedback from '../components/Feedback'
import Footer from '../components/Footer'

export default function Home() {
  return (
<div>
            <Navbar/>

   
    <div className="Container">
      <Sobre/>
      <Agendar />
      <BackToTop/>
      <Servicos/>
      <Trabalhos/>
      <Feedback/>
      <Contato/>
      <Maps/>
      <Footer/>


      {/* <ImageCarousel/> */}

      {/* <ContainedButtons/> */}

      
    </div>
    </div>  )
}
