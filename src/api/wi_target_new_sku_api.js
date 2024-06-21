import axiosClient from "../axios.js";

export function getTargetNewSkuApi(year, month, cust_id, onPassed) {
    const target_month = year + '/' + month;
    axiosClient.get(`wi_target_new_sku/list_target_new_sku/${target_month}/${cust_id}`)
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status);
        }
    );
}

export function CreateTargetNewSkuApi(skus,onPassed){
    axiosClient.post(`wi_target_new_sku/create`, {skus})
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data)
    })
}