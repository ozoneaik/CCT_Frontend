import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {CreateWiTargetSaleApi} from "../api/wi_target_sale_api.js";

function TargetShops() {
    const [target_sale, setTarget_sale] = useState(0);

    const {year,month,cust_id} = useParams();

    const onClickSave = () => {
        CreateWiTargetSaleApi(year,month,cust_id,target_sale)
    }
    return (
        <Content>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <ShopNameComponent name={'นายเอ'} code={'10021512'}/>
                        <div className={'card'}>
                            <div className={'card-body'}>
                                <div className={'d-flex justify-content-end align-items-center my-3'}>
                                    <span className={'mr-3'}>เป้าที่จะทำ</span>
                                    <input type="number" onChange={(e) => {
                                        setTarget_sale(e.target.value)
                                    }} className={'form-control mr-3'} style={{maxWidth: 300}}/>
                                    <button className={'btn btn-primary'} onClick={onClickSave}>
                                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                                        <span>บันทึก</span>
                                    </button>
                                </div>
                                <div className={'table-responsive'}>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>ป-ด</th>
                                            <th>ยอดขาย</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{year}/{month}</td>
                                            <td>8900</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className={'card'}>
                            <div className={'card-header'}>
                                <h3 className={'card-title'}>ประวัติ</h3>
                            </div>
                            <div className={'card-body'}>
                                <div className={'table-responsive'}>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>ป-ด</th>
                                            <th>จำนวนสินค้า</th>
                                            <th>ยอดขาย</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>ๅ</td>
                                            <td>ๅ</td>
                                            <td>ๅ</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Content>
    );
}

export default TargetShops;