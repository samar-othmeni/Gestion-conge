import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';

const ModalA = ({ record, onOk }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Vous êtes sûr(e) d'accepter cette demande ?");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setModalText("Vous êtes sûr(e) d'accepter cette demande ?");
    setConfirmLoading(true);
    
    try {
      await onOk(record._id);
      setOpen(false);
      setConfirmLoading(false);
    } catch (error) {
      console.error(error);
      setModalText("Une erreur est survenue, veuillez réessayer plus tard.");
      setConfirmLoading(false);
    }
  };
  
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  
  return (
    <>
      <Button onClick={showModal} icon={<CheckOutlined />} className="btnAc" style={{borderColor: "#3fce3e", color:"#3fce3e" }}>
        accepter
      </Button>
      <Modal 
        title="Confirmation"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default ModalA;