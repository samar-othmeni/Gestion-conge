import './App.css';
import Login from './component/login/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";

import ProfilE from './component/DashboredE/ProfilE';
import DemandeE from './component/DashboredE/DemandeE';
import MesDemandesE from './component/DashboredE/MesDemandesE';

import ProfilRh from './component/DashboredRh/ProfilRh';
import DemandeRh from './component/DashboredRh/DemandeRh';
import MesDemandesRh from './component/DashboredRh/MesDemandesRh';
import InboxRh from './component/DashboredRh/InboxRh';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

          {/*link for employe*/}
          <Route path="/Profil-Employe" element={<ProfilE />} />
          <Route path="/Demande-Employe" element={<DemandeE />} />
          <Route path="/MesDemandes-Employe" element={<MesDemandesE />} />

        
          {/*link for RH*/}
          <Route path="/Profil-RH" element={<ProfilRh />} />
          <Route path="/Demande-RH" element={<DemandeRh />} />
          <Route path="/MesDemandes-RH" element={<MesDemandesRh />} />
          <Route path="/Boite-de-reception-RH" element={<InboxRh />} />




          
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
