import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Form, Input, Alert, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../Style/login/Login.css';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';




const Login = () => {
  const [matricule, setMatricule] = useState('');
  const [password, setPassword] = useState('');
  const {login, isLoding, error} = useLogin();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();


  const onFinish = async (values) => {
    await login(matricule, password);

    const json = JSON.parse(localStorage.getItem('user'));


    if (  json.role === 'employee') {
      navigate('/Profil-Employe');
    } else if ( json.role === 'manager') {
      navigate('/Profil-RH');
    }
  };


  const onClose = () => {
    // Handle closing of the alert
  }
  

  return (
    <div style={{ backgroundImage: `url(./icons/back4.svg)` }} className="back">
      {contextHolder}
      <img src="./icons/login.png" className="mt-5 p-4 mx-auto d-block pos" alt="user" />

      <Row className="bx">
        <Col lg={5} md={6} sm={12} className="p-4 m-auto ">
          

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div className="mb-3">
              <Form.Item
                name="matricule"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez saisir votre matricule s il vous plait!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Matricule"
                  style={{ padding: '7px' }}
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="mb-3">
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Veuillez saisir votre mot de passe s il vous plait!',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Mot de passe"
                  style={{ padding: '7px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </div>
            {error && (
              <Alert message={error}  type="error" showIcon closable onClose={onClose}      style={{ marginTop: "5px" }}/>
            )}
            
              <div className="d-grid log">
                <Form.Item>
                  <button loading={isLoding} disabled={isLoding}   className="button">Connecter</button>
                  
                </Form.Item>
              </div>
            
          </Form>
        </Col>
      </Row>
      <h6 className="mt-3 p-5 text-center text-secondary " style={{ position: 'relative', top: '30px' }}>
      © All right reserved  
        </h6>
    </div>
  );
};

export default Login;
