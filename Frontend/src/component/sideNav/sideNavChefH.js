import React from 'react';
import {Link,useNavigate} from "react-router-dom";
import { UserOutlined  } from '@ant-design/icons';
import { Avatar } from 'antd';
import {useLogout} from '../../hooks/useLogout';

import "../Style/sideNav/sideNav.css";


const SideNavChefH = () => {

	const {logout} = useLogout()
	const navigate = useNavigate();

	const handleClick = () =>{
		logout()
		navigate('/login');
	}

    return(
				<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 " style={{ backgroundImage: `url(./icons/Untitled.svg)`} }>
					<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
					<div  className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none ">
						</div>
						<div>
							<Avatar
								size={80}
								style={{background:"#fff", color:"#333" ,position:"relative" ,left:"11%", margin:"15px"}}
								icon={<UserOutlined /> }
							/>
						</div>
						
						<h3 className='name'>Mohamed</h3>
						<p className='poste'>Poste: Chef </p>
						<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start " id="menu">
							<li className="nav-item ">
								<Link to="/Profil-Chef" className="nav-link align-middle px-0 naviL ">
								<i className="fa-regular fa-user "></i> <span className="ms-1 d-none d-sm-inline ">Profile</span>
								</Link>
							</li>

							<li>
								<Link to="/Demande-Chef" data-bs-toggle="collapse" className="nav-link px-0 align-middle naviL">
								<i className="fa-regular fa-calendar-check "></i> <span className="ms-1 d-none d-sm-inline ">Demande</span> </Link>
							</li>

							<li className="nav-item ">
								<Link to="/MesDemandes-Chef" className="nav-link px-0 align-middle naviL">
								<i className="fa-solid fa-inbox "></i> <span className="ms-1 d-none d-sm-inline "> Mes demandes</span></Link>
							</li>

                            <li className="nav-item ">
								<Link to="/Boite-de-reception-Chef" className="nav-link px-0 align-middle naviL">
								<i className="fa-solid fa-box-archive"></i> <span className="ms-1 d-none d-sm-inline "> boîte de réception</span></Link>
							</li>

						</ul>
						<hr/>

						<div className="dropdown pb-4 ">
							<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start " id="menu">
							<li className="nav-item ">
								<button className="nav-link px-0 align-middle logout" onClick={handleClick}>
								<i className="fa-solid fa-arrow-right-from-bracket"></i> <span className="ms-1 d-none d-sm-inline ">Quiter</span></button>
							</li>

							</ul>
						</div>
					</div>
				</div>

    );
};

export default SideNavChefH ;