import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';


const ModalR = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Vous été sûre de relancer cette demande ?');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('Vous été sûre de relancer cette demande ?');
    setConfirmLoading(true);
    

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Button danger onClick={showModal} icon={<ReloadOutlined />}>
        Relancer
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
export default ModalR;