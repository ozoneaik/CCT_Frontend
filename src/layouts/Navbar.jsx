import axiosClient from "../axios.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Logo from '../assets/img/Logo.png'
import {Link} from "react-router-dom";

function Navbar() {
    const {setCurrentUser, setUserToken} = useStateContext();


    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
        });
    };


    return (
        <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
            <div className="container">
                <Link to={'/'} className="navbar-brand">
                    <img src={Logo} alt="AdminLTE Logo"
                         className="brand-image "/>
                    <span className="brand-text font-weight-light">Concrete Target</span>
                </Link>

                {/*<button className="navbar-toggler order-1" type="button" data-toggle="collapse"*/}
                {/*        data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"*/}
                {/*        aria-label="Toggle navigation">*/}
                {/*    <span className="navbar-toggler-icon"></span>*/}
                {/*</button>*/}

                <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">

                    <li className="nav-item dropdown">
                        <button className={'btn btn-danger btn-sm'}>
                            <i className="fa-solid fa-right-from-bracket mr-1"></i>
                            <span>ออกจากระบบ</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;