import axiosClient from "../axios.js";
import {AlertSuccessTimer} from "../dialogs/AlertSuccess.js";
import {AlertError} from "../dialogs/AlertError.js";

export function LoginApi(username,password,onSuccess){
    axiosClient.post('/login',{
        username,
        password,
    }).then(({data,status})=>{
        if (status === 200){
            AlertSuccessTimer('เข้าสู่ระบบสำเร็จ',data.message,1000);
            onSuccess(data.user, data.token);
        }
    }).catch((error)=>{
        let Error = error.response;
        AlertError('error '+Error.status,Error.data.message);
    });
}

export function GetProfileApi(onPassed){
    axiosClient.get(`/me`)
        .then(({data}) =>{
            onPassed(data);
        });
}