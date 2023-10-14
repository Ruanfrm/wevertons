import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CrisisAlertRoundedIcon from '@mui/icons-material/CrisisAlertRounded';
import logo from "../imagens/logo.png"
// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAUYHcoYtrwXJNiXQIDhkI9eTZ2qm44caw",
  authDomain: "cardapiovirtual-d2d6b.firebaseapp.com",
  databaseURL: "https://cardapiovirtual-d2d6b-default-rtdb.firebaseio.com",
  projectId: "cardapiovirtual-d2d6b",
  storageBucket: "cardapiovirtual-d2d6b.appspot.com",
  messagingSenderId: "173010671308",
  appId: "1:173010671308:web:15fd5e2dea8851860a9469"
};


const firebaseApp = initializeApp(firebaseConfig);

function Sobre() {
  const [mission, setMission] = useState("");
  const [values, setValues] = useState("");

  useEffect(() => {
    // Referência ao nó "mission_values" no banco de dados Firebase
    const db = getDatabase(firebaseApp);
    const missionValuesRef = ref(db, "mission_values");

    // Use onValue para ouvir as mudanças no banco de dados e atualizar o estado local
    onValue(missionValuesRef, (snapshot) => {
      const data = snapshot.val();
      setMission(data.mission);
      setValues(data.values);
    });

    // Certifique-se de desinscrever-se quando o componente for desmontado
    return () => {
      // Não é necessário desinscrever-se usando onValue
    };
  }, []); // O segundo argumento vazio [] garante que o efeito ocorra somente uma vez ao montar o componente.

  return (
    <div >
      {/* <h1 className="title">WEVERTON'S BARBERSHOP</h1> */}
      <div className="img-sobre">
      <img  src={logo} />
      </div>
      <div className="home">
        <div>
          <h3 className="valores">Visão <CrisisAlertRoundedIcon sx={{ fontSize: 30 }}/> </h3>
          <p className="paragrafo">{mission}</p>
        </div>
        <div>
          <h3 className="missao">Missão <RocketLaunchIcon sx={{ fontSize: 30 }}/> </h3>
          <p className="paragrafo">{values}</p>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
