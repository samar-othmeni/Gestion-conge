import React, { useState, useEffect } from "react";
import SideNavRH from "../sideNav/SideNavRH.js";
import "../Style/dashbored/Demande.css";

const DemandeRh =() => {
    const [dateD, setDateD] = useState("");
    const [dateF, setDateF] = useState("");
    const [typeCongeList, setTypeCongeList] = useState([]);
    const [selectedTypeCongeId, setSelectedTypeCongeId] = useState("");
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [nombreDeJours, setNombreDeJours] = useState(null);
  
    const userID = user?._id;
  
    useEffect(() => {
      const fetchTypeCongeList = async () => {
        try {
          const response = await fetch("/api/typeConge");
          const json = await response.json();
  
          if (response.ok) {
            setTypeCongeList(json);
          }
  
          if (!response.ok) {
            setError(json.error);
          }
        } catch (error) {
          setError(error);
        }
      };
  
      fetchTypeCongeList();
    }, []);
  
    useEffect(() => {
      const fetchUser = async () => {
        const response = await fetch("/api/user/642d6cc69d27badf76526c92");
        const json = await response.json();
  
        if (response.ok) {
          setUser(json);
        }
      };
  
      fetchUser();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const conge = {
        dateDebut: dateD,
        dateFin: dateF,
        userId: userID,
        typeCongeId: selectedTypeCongeId,
      };
  
      try {
        const response = await fetch("/api/conge/", {
          method: "POST",
          body: JSON.stringify(conge),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const json = await response.json();
  
        if (!response.ok) {
          setError(json.error);
        } else {
          // Calculate number of days between start and end dates
          const days = calculateDays(dateD, dateF);
          setNombreDeJours(days);
  
          setSuccessMessage("La demande de congé a été envoyée avec succès!");
          // Clear form inputs after successful submission
          setDateD("");
          setDateF("");
          setSelectedTypeCongeId("");
        }
      } catch (error) {
        setError(error);
      }
    };
  
    const handleTypeCongeChange = (event) => {
      setSelectedTypeCongeId(event.target.value);
    };
  
    // Function to calculate number of days between two dates
    const calculateDays = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return days;
    };
  
    return (
      <div>
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <SideNavRH />
            <div class="col py-3">
              <div className="container-profil">
                <header className="titleD">Demande un congé</header>
                <form className="form1" onSubmit={handleSubmit}>
                  {successMessage && (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  )}
                                  <div className="fieldsP ">
                                      <div className="input-fieldP">
                                          <label>Date de debut</label>
                                          <input type="Date"  onChange={(e) => setDateD(e.target.value)} value={dateD}/>
                                      </div>
                                      <div className="input-fieldP">
                                          <label>Date de Fin</label>
                                          <input type="Date" onChange={(e) => setDateF(e.target.value)} value={dateF}/>
                                      </div>
  
                                      <div className="input-fieldP">
                                      <label>Type de demande de congé</label>
                                      <select value={selectedTypeCongeId} onChange={handleTypeCongeChange}>
                                          <option value="">Sélectionner un type de congé</option>
                                          {typeCongeList.map((typeConge) => (
                                              <option key={typeConge?._id} value={typeConge?._id}>{typeConge?.nom}</option>
                                          ))}
                                      </select>
                                      </div>
  
                                      <div className="input-fieldP">
                                        <label>Nombre de jours</label>
                                        <input type="text" value={calculateDays(dateD, dateF)} />
                                      </div>                                 
                                  <div className="posBtn1">
  
                                      <button type = "button" className = "btn-warning" style={{position:"relative",right:"30px"}}>
                                          <i class = "fa fa-upload"></i> pièce jointe
                                          <input type="file"/>
                                      </button>
                                      <button className="buttonD1" ><span className="text">Valider</span></button>
  
                                  </div>
                                  </div>
                              </form>
                      </div>
                  </div>
          </div>
          </div>
          </div>
      );
  };

export default DemandeRh;