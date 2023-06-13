import React from "react";
import SideNavE from "../sideNav/SideNavE.js";
import "../Style/dashbored/Profil.css";
import { useState, useEffect } from "react";

const ProfilE = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/user/642d6c3e9d27badf76526c90");
      const json = await response.json();

      if (response.ok) {
        setUser(json);
        
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SideNavE />
        <div className="col py-3">
          <div className="container-profil">
            <header>Profile Employé</header>
            <form className="form1" action="#">
              <div className="formP first">
                <div className="details personal">
                  <span className="title">Détails personnels</span>

                  <div className="fieldsP">
                    <div className="input-fieldP">
                      <label>Nom</label>
                      <input type="text" readOnly defaultValue={user?.nom} />
                    </div>

                    <div className="input-fieldP">
                      <label>Numero Téléphone</label>
                      <input type="text" readOnly defaultValue={user?.telephone} />
                    </div>

                    <div className="input-fieldP">
                      <label>Email</label>
                      <input type="text" readOnly defaultValue={user?.email} />
                    </div>

                    <div className="input-fieldP">
                      <label>Prenom</label>
                      <input type="text" readOnly defaultValue={user?.prenom} />
                    </div>

                    <div className="input-fieldP">
                      <label>Date de naissance</label>
                      <input type="date" readOnly defaultValue={user?.dateNaissance} />
                    </div>

                    <div className="input-fieldP">
                      <label>Sexe</label>
                      <input type="text" readOnly defaultValue={user?.gender} />
                    </div>
                  </div>
                </div>
                <br />
                <div className="details ID">
                  <span className="title">Identity Details</span>

                  <div className="fieldsP">
                    <div className="input-fieldP">
                      <label>Cin</label>
                      <input type="text" readOnly defaultValue={user?.cin} />
                    </div>

                    <div className="input-fieldP">
                      <label>Matricule</label>
                      <input type="text" readOnly defaultValue={user?.account?.matricule} />
                    </div>

                    <div className="input-fieldP">
                      <label>Poste</label>
                      <input type="text" readOnly defaultValue={user?.grade} />
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="details ID">
                  <span className="title">Solde</span>

                  <div className="fieldsP">
                    <div className="input-fieldP">
                      <label>Medical</label>
                      <input type="text" readOnly defaultValue={user?.solde.medical} />
                    </div>

                    <div className="input-fieldP">
                      <label>Annual</label>
                      <input type="text" readOnly defaultValue={user?.solde.annual} />
                    </div>

                    <div className="input-fieldP">
                      <label>Maternite</label>
                      <input type="text" readOnly defaultValue={user?.solde.maternite} />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilE;
