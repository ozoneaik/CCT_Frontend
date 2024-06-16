import axiosClient from "../axios.js";

export function ListTargetProApi(year, month, cust_id, onPassed) {
    axiosClient.get(`/wi_target_pro/list_target_pro/${year}/${month}/${cust_id}`)
        .then((response) => {
            if (response && response.status === 200) {
                onPassed(response.data);
            }
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data)
        }
    )
}