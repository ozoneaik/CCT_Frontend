import axiosClient from "../axios.js";

export function ListApi(cust_id, onPassed) {
    axiosClient.get(`/wi_target_sale/list/${cust_id}`)
        .then(({data, status}) => {
            console.log('list >> ',data.list)
            if (status === 200) {
                onPassed(data.list)
            }
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data)
        }
    )
}

export function ListTargetApi(year, month, cust_id, onPassed) {
    axiosClient.get(`wi_target_sale/list-target/${year}/${month}/${cust_id}`)
        .then(({data, status}) => {
            console.log('listTarget >> ',data.listTarget)
            if (status === 200) {
                onPassed(data.listTarget,status)
            }
        }).catch((error) => {
            let Error = error.response;
        console.log(Error)
            onPassed(Error.data,Error.status)
        }
    )
}

export function CreateWiTargetSaleApi(year, month, cust_id, target_sale) {
    return axiosClient.post('wi_target_sale/create', {
        target_month: year + '/' + month,
        cust_id,
        target_sale
    })
}

export function UpdateWiTargetSaleApi(data, uri) {
    console.log(uri, data)
    return axiosClient.post(`${uri}`, {
        cust_id: data.custid,
        target_month: data.target_month,
        target_sale: data.target_sale,
    })
}

