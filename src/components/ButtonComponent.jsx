// eslint-disable-next-line react/prop-types
export function ButtonComponent({title,BtnStyle='btn-primary',onClick, Icon='fa-floppy-disk'}) {
    return (
        <button className={`btn ${BtnStyle}`} onClick={onClick}>
            <i className={`fa-solid ${Icon} ${title ? 'mr-2' : ''}`}></i>
            <span>{title}</span>
        </button>
    )
}