import Swal from "sweetalert2";
import {UpdateWiTargetSaleApi} from "../api/wi_target_sale_api.js";

export function AlertInfo(title,text,data,uri,onsuccess) {
    console.log(data,uri);
    Swal.fire({
        icon: "info",
        title,
        text,
        confirmButtonText: 'อัพเดทเป้าหมาย',
        showCancelButton : true,
        cancelButtonText : 'ยกเลิก',
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            console.log(uri,'from Alert Info')
            onsuccess(data,uri)
        }
    })
}