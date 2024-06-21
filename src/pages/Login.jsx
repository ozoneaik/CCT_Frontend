import LogoLogin from '../assets/img/Login.png'
import {LoginApi} from "../api/login_api.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setCurrentUser, setUserToken} = useStateContext();
    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault();
        LoginApi(username,password,(user,token) => {
            setCurrentUser(user);
            setUserToken(token);
            navigate('/')

        })
    };
    return (
        <div className={'hold-transition login-page'}>
            <div className="login-box">
                <div className="card card-danger card-outline">
                    <div className="card-body login-card-body">
                        <div className={''}>
                            <img src={LogoLogin? LogoLogin : ''} alt="" width="100%" height={'100%'}/>
                        </div>
                        <p className="login-box-msg text-dark text-bold mt-2" style={{fontSize: 25}}>เข้าสู่ระบบ</p>
                        <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                            <div className="input-group mb-3">
                                <input type="text" onChange={(e)=> setUsername(e.target.value)} className="form-control" placeholder="ชื่อผู้ใช้งานระบบ" name="email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="รหัสผ่าน" name={'password'} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="w-100">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        <i className="fa-solid fa-right-to-bracket mr-1"></i>
                                        <span>เข้าสู่ระบบ</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;