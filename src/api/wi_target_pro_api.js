import axiosClient from "../axios.js";

export function ListTargetProApi(year, month, cust_id, onPassed) {
    axiosClient.get(`/wi_target_pro/list_target_pro/${year}/${month}/${cust_id}`)
        .then(({data,status}) => {
                onPassed(data,status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data,Error.status);
        }
    )
}

export function getSkuNameApi(pro_sku,onPassed){
    axiosClient.get(`/wi_target_pro/get_sku_name/${pro_sku}`)
        .then((response) => {
            if (response && response.status === 200) {
                onPassed(response.data);
            }
        }).catch(() => {
            onPassed('กรอกรหัสสินค้าที่ถูกต้อง')
    })
}

export function CreateTargetProApi(promotions,year,month,onPassed){
    axiosClient.post(`/wi_target_pro/create/${year}/${month}`,promotions)
        .then(({data, status}) => {
            if (status === 200) {
                onPassed(data,status);
            }
        }).catch((error) =>{
            let Error = error.response;
            onPassed(Error.data,Error.status)
    })
}