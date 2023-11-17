import React from "react";
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from '../components/Footer'

const Faq = () => {
  const faqData = [
    {
      question: "Quanto tempo dura um corte de cabelo?",
      answer: "A duração de um corte de cabelo varia de acordo com o estilo e o tipo de cabelo, mas geralmente leva entre 30 minutos e 1 hora."
    },
    {
      question: "Posso fazer um agendamento online?",
      answer: "Sim, você pode agendar um horário online em nosso site ou ligar para nossa barbearia para fazer um agendamento."
    },
    {
      question: "Quais métodos de pagamento vocês aceitam?",
      answer: "Aceitamos dinheiro, cartões de crédito e débito, pix. Certifique-se de trazer o método de pagamento de sua preferência."
    },
    {
      question: "Vocês oferecem cortes de cabelo para crianças?",
      answer: "Sim, oferecemos cortes de cabelo para todas as idades, incluindo crianças."
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Perguntas Frequentes
      </Typography>
      {faqData.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Footer/>
    </Container>
  );
};

export default Faq;