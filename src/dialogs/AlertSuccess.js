import Swal from "sweetalert2";

export function AlertSuccess(title = 'สำเร็จ' , text) {
    Swal.fire({
        icon : 'success',
        title,
        text,
        confirmButtonText: 'ตกลง',
    })
}

export function AlertSuccessTimer(title='สำเร็จ',text,timer = 1500){
    Swal.fire({
        icon : 'success',
        title,
        text,
        showConfirmButton: false,
        timer
    })
}