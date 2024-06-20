import axiosClient from "../axios.js";

const prefix = 'ma_target_cust';

export function getMaTargetCustApi(target=1,target_month,onPassed) {
    console.log(target_month)
    axiosClient.get( `${prefix}/list/${target_month}/${target}`,)
        .then(({data, status}) => {
            onPassed(data, status)
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status);
        }
    );
}