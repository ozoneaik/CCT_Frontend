import Swal from "sweetalert2";

export function AlertError (title= 'เกิดข้อผิดพลาด' ,text= 'เพิ่มข้อความ') {
    Swal.fire({
        icon: 'error',
        title,
        text
    })
}