import axiosClient from "../axios.js";

const prefix = 'ma_target_cust';


export function getMaTargetCustApi(onPassed) {
    axiosClient.get(prefix + '/list')
        .then(({data, status}) => {
            onPassed(data, status)
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status);
        }
    );
}