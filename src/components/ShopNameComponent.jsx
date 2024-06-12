import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ShopNameComponent({name='ไม่ได้ระบุ',code='ไม่ได้ระบุ'}) {
    const navigate = useNavigate();
    return (
        <div className={'card card-outline card-primary'}>
            <div className={'card-body'}>
                <div className={'d-flex justify-content-center align-items-center'}>
                    <div className={'mr-3'}>
                        <button id={'btn-back'} onClick={() => navigate(-1)}
                                className={'btn btn-sm btn-outline-secondary'}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>

                    </div>
                    <div className={'w-100'}>
                        <div className={'header'}>
                            <h6>{code}</h6>
                            <h3>ร้าน&nbsp;{name}</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default ShopNameComponent;