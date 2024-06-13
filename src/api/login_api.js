import axiosClient from "../axios.js";
import {AlertSuccess} from "../dialogs/AlertSuccess.js";
import {AlertError} from "../dialogs/AlertError.js";

export function LoginApi(username,password,onSuccess){
    axiosClient.post('/login',{
        username,
        password,
    }).then(({data,status})=>{
        if (status === 200){
            AlertSuccess('เข้าสู่ระบบสำเร็จ',data.message);
            onSuccess(data.user, data.token);
        }
    }).catch((error)=>{
        let Error = error.response;
        AlertError('error '+Error.status,Error.data.message);
    });
}