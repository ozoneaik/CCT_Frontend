import {Link, useLocation} from "react-router-dom";
import Logo from "../assets/img/background.jpeg"
import UserImage from "../assets/img/user2-160x160.jpg"
import {useStateContext} from "../contexts/ContextProvider.jsx";

function Sidebar() {

    const {currentUser} = useStateContext();
    const location = useLocation();

    return (
        // sidebar-dark-primary
        <aside className={'main-sidebar elevation-4 sidebar-dark-orange'} style={{backgroundColor: "#252525"}}>
            <Link to={'#'} className={'p-0'} style={{background: '#000'}}>
                <img src={Logo ? Logo : '#'} alt={'adminLte Logo'} className={'brand-image elevation-3'} style={{width: '100%'}}/>
            </Link>

            <div className={'sidebar mt-3'}>
                <div className={'user-panel pb-3 mb-3 d-flex align-items-center'}>
                    <div className={'image'}>
                        <img src={UserImage ? UserImage : '#'} alt="User Image" className={'img-circle elevation-2'}/>
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{currentUser.name} <br/> ( {currentUser.emp_role} )</a>
                    </div>
                </div>

                <nav className={'mt-2'}>
                    <ul className={'nav nav-pills nav-sidebar flex-column nav-child-indent'} data-widget="treeview"
                        role="menu"
                        data-accordion="false">
                        <li className={`nav-item ${location.pathname.startsWith('/dashboard') ? 'menu-open' : ''}`}>
                            <a href="#"
                               className={`nav-link ${location.pathname.startsWith('/dashboard') ? 'active' : ''}`}>
                                <i className="nav-icon fa-solid fa-hand-holding-dollar"></i>
                                <p>Dashboard Sales<i className="right fas fa-angle-left"></i></p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={'/dashboard'}
                                          className={`nav-link ${location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard') ? 'active' : ''}`}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>หน้าแดชบอร์ด</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </nav>
            </div>


        </aside>
    );
}

export default Sidebar;