import axiosClient from "../axios.js";
import {AlertSuccess} from "../dialogs/AlertSuccess.js";
import {AlertError} from "../dialogs/AlertError.js";

export function WitargetSaleListApi() {
    axiosClient.get("/wi_target_sale_list").then((data, status) => {
        if (status === 200) {
            console.log(data)
        }
    }).catch((error) => {
        console.log(error)
    })
}

export function CreateWiTargetSaleApi(year, month, cust_id, target_sale) {
    axiosClient.post('wi_target_sale/create', {
        target_month: year+'/'+month,
        cust_id,
        target_sale
    }).then((data, status) => {
        if (status === 200) {
            AlertSuccess('สร้างเป้าหมายสำเร็จ', data.message)
        }
    }).catch((error) => {
        let Error = error.response;
        AlertError('error ' + Error.status, Error.data.message);
    })
}

