import axiosClient from "../axios.js";

export function getTargetSkuApi(target_month, cust_id, onPassed) {
    axiosClient.get(`/wi_target_sku/list_target_sku/${target_month}/${cust_id}`)
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status);
        }
    );
}

export function getCurrentSkuApi(target_month, cust_id, onPassed) {
    axiosClient.get(`/wi_target_sku/list_target_sku_now/${target_month}/${cust_id}`)
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status);
        }
    );
}