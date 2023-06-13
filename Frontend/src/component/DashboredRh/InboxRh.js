import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import ModalA from '../Modal/ModalAccepter.js';
import ModalRe from '../Modal/ModalRejeter.js';
import SideNavRH from '../sideNav/SideNavRH.js';

const InboxRh = () => {
  const [demandes, setDemandes] = useState([]);
  const [userId, setUserId] = useState('642d6c3e9d27badf76526c90');
  const [acceptedDemandes, setAcceptedDemandes] = useState([]);


  useEffect(() => {
    const fetchDemande = async () => {
      const response = await fetch(`/api/conge/user/${userId}/conges`);
      const json = await response.json();

      if (response.ok) {
        setDemandes(json);
        console.log(json);
      }
    };

    fetchDemande();
  }, [userId]);

  const handleApprove = async (congeId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/conge/${congeId}/accepter`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '642d6cc69d27badf76526c92',
        }),
      });
      const data = await response.json();
      console.log(data.message); // Display success message in console
      
      // Remove the row from demandes and add it to acceptedDemandes
      const index = demandes.findIndex(d => d._id === congeId);
      setAcceptedDemandes([...acceptedDemandes, demandes[index]]);
      setDemandes(demandes.filter(d => d._id !== congeId));
    } catch (error) {
      console.error(error); // Display error in console
    }
  };
  
  const handleRefuse = async (congeId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/conge/${congeId}/refuser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '642d6cc69d27badf76526c92',
        }),
      });
      const data = await response.json();
      console.log(data.message); // Display success message in console
      
      // Remove the row from demandes and add it to acceptedDemandes
      const index = demandes.findIndex(d => d._id === congeId);
      setAcceptedDemandes([...acceptedDemandes, demandes[index]]);
      setDemandes(demandes.filter(d => d._id !== congeId));
    } catch (error) {
      console.error(error); // Display error in console
    }
  };
  
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <ModalA record={record} onOk={handleApprove} />
          <ModalRe record={record} onOk={handleRefuse} />
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
              <header className="titleD">Liste de demandes envoyes</header>
              <Table columns={columns} dataSource={demandes} rowKey="_id" />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default InboxRh;
  