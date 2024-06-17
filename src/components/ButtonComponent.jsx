// eslint-disable-next-line react/prop-types
export function ButtonComponent({title='ไม่ได้ระบุ',BtnBg='btn-primary',onClick}) {
    return (
        <button className={`btn ${BtnBg}`} onClick={onClick}>
            <i className="fa-solid fa-floppy-disk mr-2"></i>
            <span>{title}</span>
        </button>
    )
}