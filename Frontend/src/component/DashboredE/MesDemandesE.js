import React, { useState, useEffect } from 'react';
import { Pagination, Space, Table, Tag, pagination } from 'antd';
import SideNavE from '../sideNav/SideNavE';
import ModalR from '../Modal/ModalRelancer';


import '../Style/dashbored/MesDemandes.css';

const MesDemandesE = () => {
  const [demandes, setDemandes] = useState([]);
  const [type, setType] = useState([]);
  const userId = '642d6c3e9d27badf76526c90';

  useEffect(() => {
    const fetchDemande = async () => {
      const response = await fetch(`/api/conge/user/${userId}/conges`);
      const json = await response.json();

      if (response.ok) {
        setDemandes(json);
        console.log(json)

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
      title: 'Date Debut',
      dataIndex: 'dateDebut',
      key: 'dateDebut',
      render: (dateDebut) =>
        new Date(dateDebut).toLocaleDateString('en-US', { dateStyle: 'medium' }),
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.dateDebut) - new Date(b.dateDebut),
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
      render: (typeConge) => typeConge.nom,
      filters: [
        {
          text: 'Annual',
          value: 'annual',
        },
        {
          text: 'Maladie',
          value: 'medical',
        },
      ],
      onFilter: (value, record) => record.typeConge.nom.toLowerCase().includes(value.toLowerCase()),
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
      filters: [
        {
          text: 'approuvé',
          value: 'approuvé',
        },
        {
          text: 'refusé',
          value: 'refusé',
        },
        {
          text: 'attente',
          value: 'attente',
        },
      ],
      onFilter: (value, record) => record.status.toLowerCase().includes(value.toLowerCase()),
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
    

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SideNavE />
        <div className="col py-3">
          <div className="container-profil">
            <header className="titleD">Mes demandes</header>
            <Table columns={columns} dataSource={demandes} onChange={onChange} />
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MesDemandesE;
