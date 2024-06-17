import Swal from "sweetalert2";

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

export function AlertQuestion(title='แน่ใจหรือไม่',text='คุณแน่ใจหรือไม่',onPassed){
    Swal.fire({
        icon: "question",
        title,
        text,
        confirmButtonText: 'ยืนยัน',
        showCancelButton : true,
        cancelButtonText : 'ยกเลิก',
        allowOutsideClick: false,
    }).then((result)=>{
        if (result.isConfirmed) {
            onPassed(true)
        }else{
            onPassed(false)
        }
    })
}