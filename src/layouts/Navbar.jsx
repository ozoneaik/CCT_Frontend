import axiosClient from "../axios.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Logo from '../assets/img/Logo.png'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
function Navbar({username, saleId}) {
    const {setCurrentUser, setUserToken} = useStateContext();
    const [localSaleId, setLocalSaleId] = useState('');

    useEffect(() => {
        if (saleId !== undefined) {
            setLocalSaleId(saleId);
        }
    }, [username, saleId]);

    const logout = (ev) => {
        localStorage.removeItem('DateTime');
        ev.preventDefault();
        axiosClient.post("/logout").then((res) => {
            console.log('res => ', res.status)
            setCurrentUser({});
            setUserToken(null);
        });
    };

    return (
        <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
            <div className="container">
                <Link to={'/'} className="navbar-brand">
                    <img src={Logo ? Logo : '#'} alt="AdminLTE Logo" className="brand-image"/>
                    <span className="brand-text font-weight-light">Concrete Target</span>
                </Link>
                <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                    <li className={'nav-item mr-3'}>
                        <span className={'text-bold'}>[&nbsp;รหัสเซลล์&nbsp;{localSaleId}&nbsp;]</span>
                    </li>
                    <li className="nav-item">
                        <button onClick={(e) => logout(e)} className={'btn btn-danger btn-sm'}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;