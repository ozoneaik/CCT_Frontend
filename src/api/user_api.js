import axiosClient from "../axios.js";

export function userListApi(onPassed) {
    axiosClient.get('/list-users').then(({data, status}) => {
        onPassed(data, status)
    }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status);
        }
    );

}