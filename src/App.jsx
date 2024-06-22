import './App.css'
import {useEffect, useState} from "react";
import {userListApi} from "./api/user_api.js";
import Loading from "./components/Loading.jsx";

function App() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = () => {
        userListApi((data, status) => {
            setUsers(status === 200 ? data : []);
            setLoading(false);
        })
    }

    return (
        <div id={'app'}>
            <div className={'d-flex justify-content-between'}>
                <div className={'left'}>
                    <p>รายชื่อผู้ใช้งาน</p>
                </div>
                <div className={'right'}>
                    <button className={'btn btn-danger'}>ออกจากรับบ</button>
                </div>
            </div>
            <div className={'user-list'}>
                {loading ? (
                    <Loading/>
                ) : (
                    users.length > 0 ? (
                        users.map((user, index) => (
                            <>
                                <div key={index} className={'card'}>
                                    <div className={'card-body'}>
                                        <div className={'text-center'}>
                                            <h5>คนที่ {index + 1}</h5>
                                        </div>
                                        <div className={'Image d-flex justify-content-center'}>
                                            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="" height={100}/>
                                        </div>
                                        <div className={'text-center'}>
                                            <h6>{user.name}</h6>
                                            <p>รหัส {user.username}</p>
                                        </div>
                                        <div className={'d-flex justify-content-center'}>
                                            <button className={'w-100 BTN'}>View Profile</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <p>ไม่มีข้อมูลผู้ใช้</p>
                    )

                )}

            </div>
        </div>

    )
}

export default App
