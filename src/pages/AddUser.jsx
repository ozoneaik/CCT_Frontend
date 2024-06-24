import CardContentComponent from "../components/CardContentComponent.jsx";
import {useState} from "react";
import {createUserApi} from "../api/user_api.js";
import {AlertSuccess} from "../dialogs/AlertSuccess.js";
import {AlertError} from "../dialogs/AlertError.js";
import {useNavigate} from "react-router-dom";

function AddUser() {

    const [user, setUser] = useState({
        name : '',
        username : '',
        password : ''
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const onSave = ()=> {
        const newUser = {
            ...user,
            confirmPassword
        }
        createUserApi(newUser, (data, status) => {
            if (status === 200){
                AlertSuccess(data.message);
                navigate('/manage-user')
            }else{
                AlertError(data.message);
            }
        })
    }

    return (
        <div className={'p-4'}>
            <div className={'user-list'}>
                <CardContentComponent CardHeader={true} HeaderTitle={'เพิ่มผู้ใช้งาน'}>
                    <div className={'form-group'}>
                        <label htmlFor="">ชื่อ-นามกสุล</label>
                        <input type="text" className={'form-control'}
                               name={'name'}
                               onChange={(e) => setUser({...user, [e.target.name]: e.target.value})}
                        />
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="">ชื่อผู้ใช้งาน</label>
                        <input type="text" className={'form-control'}
                               name={'username'}
                               onChange={(e)=> setUser({...user, [e.target.name]: e.target.value})}
                        />
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="">รหัสผ่าน</label>
                        <input type="password" className={'form-control'}
                               name={'password'}
                               onChange={(e)=> setUser({...user, [e.target.name]: e.target.value})}
                        />
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="">ยืนยันรหัสผ่าน (admin)</label>
                        <input type="password" className={'form-control'}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className={'d-flex justify-content-end'}>
                        <button className={'btn btn-primary'} onClick={onSave}>บันทึก</button>
                    </div>
                </CardContentComponent>
            </div>
        </div>

    )
}

export default AddUser;
