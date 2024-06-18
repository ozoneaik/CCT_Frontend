import Swal from "sweetalert2";

export function AlertError (title= 'เกิดข้อผิดพลาด' ,text= '') {
    Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonText: 'ตกลง'
    })
}