import './App.css'
import {useEffect, useState} from "react";
import {userListApi} from "./api/user_api.js";
import Loading from "./components/Loading.jsx";
import axiosClient from "./axios.js";
import {useStateContext} from "./contexts/ContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import {ButtonComponent} from "./components/ButtonComponent.jsx";
import Logo from "./assets/img/logoNoText.png"

function App() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setCurrentUser, setUserToken} = useStateContext();
    const navigate = useNavigate();
    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = () => {
        userListApi((data, status) => {
            setUsers(status === 200 ? data : []);
            setLoading(false);
        })
    }

    const logout = (ev) => {
        localStorage.removeItem('DateTime');
        ev.preventDefault();
        axiosClient.post("/logout").then((res) => {
            console.log('res => ', res.status)
            if (res.data.success) {
                navigate('/login')
            }
            setCurrentUser({});
            setUserToken(null);

        });
    };

    return (
        <div id={'app'}>
            <div className={'d-flex justify-content-between'}>
                <div className={'left'}>
                    <p>รายชื่อผู้ใช้งาน</p>
                </div>
                <div className={'right'}>
                    <ButtonComponent onClick={(e) => logout(e)} title={'ออกจากระบบ'} BtnStyle={'btn-danger'} Icon={'fa-right-from-bracket'}/>
                </div>
            </div>
            <div className={'user-list'}>
                {loading ? (
                    <Loading/>
                ) : (
                    <>
                        <div className={'card'}>
                            <div className={'card-body'}>
                                <div className={'d-flex align-items-center justify-content-center h-100'}>
                                    <i className={'fa fa-solid fa-plus mr-2'}></i>
                                    <p>เพิ่มผู้ใช้งาน</p>
                                </div>
                            </div>
                        </div>
                        {
                            users.length > 0 ? (
                                users.map((user, index) => (

                                    <div key={index} className={'card'} style={{border: user.name === 'แอดมิน' ? 'solid 1px #ccc' : ''}}>
                                        <div className={'card-body'}>
                                            <div className={'text-center'}>
                                                <h5>คนที่ {index + 1}</h5>
                                            </div>
                                            <div className={'Image d-flex justify-content-center'}>
                                                <img src={Logo || ''} alt="" height={100} width={100}/>
                                            </div>
                                            <div className={'text-center'}>
                                                <h6>{user.name}</h6>
                                                <p>รหัส {user.username}</p>
                                            </div>
                                            <div className={'d-flex justify-content-between mt-2'}>
                                                <button className={'btn btn-secondary text-sm px-3 w-100 mr-3'} data-toggle="modal" data-target={`#edit${index}`}>
                                                    <i className={'fa fa-solid fa-edit mr-1'}></i>
                                                    <span>แก้ไข</span>
                                                </button>
                                                <button className={'btn btn-danger text-sm px-3 w-100'}>
                                                    <i className={'fa fa-solid fa-trash mr-1'}></i>
                                                    <span>ลบ</span>
                                                </button>
                                            </div>

                                            <div className="modal fade" id={`edit${index}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">{user.name}</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className={'form-group'}>
                                                                <label htmlFor={`name${index}`}>ชื่อ-นามสกุล</label>
                                                                <input type="text" className={'form-control'} id={`name${index}`} defaultValue={user.name}/>
                                                            </div>
                                                            <div className={'form-group'}>
                                                                <label htmlFor={`username${index}`}>ชื่อผู้ใช้</label>
                                                                <input readOnly={true} type="text" className={'form-control'} id={`username${index}`} defaultValue={user.username}/>
                                                            </div>
                                                            <div className={'form-group'}>
                                                                <label htmlFor={`new-password${index}`}>รหัสผ่านใหม่</label>
                                                                <input type="password" name={`new-password${index}`} className={'form-control'} id={`password${index}`}/>
                                                            </div>
                                                            <div className={'form-group'}>
                                                                <label htmlFor={`confirm-password${index}`}>ยืนยันรหัสผ่าน (admin)</label>
                                                                <input type="password" name={`confirm-password${index}`} className={'form-control'} id={`confirm-password${index}`}/>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                                            <button type="button" className="btn btn-primary">บันทึก</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>ไม่มีข้อมูลผู้ใช้</p>
                            )
                        }
                    </>

                )}

            </div>
        </div>

    )
}

export default App
