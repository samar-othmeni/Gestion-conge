import SideNavRH from "../sideNav/SideNavRH.js";
import React, { useState, useEffect } from 'react';
import '../Style/dashbored/MesDemandes.css';
import { Space, Table, Tag  } from 'antd';
import ModalR from "../Modal/ModalRelancer.js";

const MesDemandesRh = () => {
  const [demandes, setDemandes] = useState([]);
  const [type, setType] = useState([]);
  const userId = '642d6cc69d27badf76526c92';

  useEffect(() => {
    const fetchDemande = async () => {
      const response = await fetch(`/api/conge/user/${userId}/conges`);
      const json = await response.json();

      if (response.ok) {
        setDemandes(json);
      }
    };

    fetchDemande();
  }, []);

  useEffect(() => {
    const fetchType = async () => {
      const response = await fetch('/api/typeConge');
      const json = await response.json();

      if (response.ok) {
        setType(json);
      }
    };
    fetchType();
  }, []);

  

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Date Debut',
      dataIndex: 'dateDebut',
      key: 'dateDebut',
      render: (dateDebut) =>
        new Date(dateDebut).toLocaleDateString('en-US', { dateStyle: 'medium' }),
    },
    {
      title: 'Date Fin',
      dataIndex: 'dateFin',
      key: 'dateFin',
      render: (dateFin) =>
        new Date(dateFin).toLocaleDateString('en-US', { dateStyle: 'medium' }),
    },
    {
      title: 'Type',
      dataIndex: 'typeConge',
      key: 'typeConge',
      render: (typeConge) => typeConge.nom,
    },
    {
      title: 'Resultat',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'approuvé':
            color = 'success';
            break;
          case 'refusé':
            color = 'error';
            break;
          default:
            color = 'processing';
            break;
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <ModalR />
        </Space>
      ),
    },
    
  ];

    

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SideNavRH />
        <div className="col py-3">
          <div className="container-profil">
            <header className="titleD">Mes demandes</header>
            <Table columns={columns} dataSource={demandes} rowKey="_id" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MesDemandesRh;
