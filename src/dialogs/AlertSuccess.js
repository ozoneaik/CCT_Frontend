import Swal from "sweetalert2";

export function AlertSuccess(title = 'สำเร็จ' , text) {
    Swal.fire({
        icon : 'success',
        title,
        text,
        confirmButtonText: 'ตกลง',
        // showConfirmButton: false,
        // timer: 1500
    })
}