import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { CloseOutlined  } from '@ant-design/icons';


const ModalRe = ({ record, onOk }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Vous êtes sûr(e) rejeter cette demande ?");
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
      <Button danger onClick={showModal} icon={<CloseOutlined />}>
        Rejeter
      </Button>
      <Modal 
        title="Confirmation"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}

      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};
export default ModalRe;