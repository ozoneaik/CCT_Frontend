import React, {useEffect, useState} from "react";
import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import {getCurrentSkuApi, getTargetSkuApi} from "../api/wi_target_sku.js";
import {useParams} from "react-router-dom";

function RepeatOrders() {
    const {year, month, cust_id, cust_name} = useParams();
    const [targetSkusOneAgo, setTargetSkusOneAgo] = useState([]);
    const [targetSkusTwoAgo, setTargetSkusTwoAgo] = useState([]);
    const [targetSkuNow, setTargetSkuNow] = useState([]);
    const [changedInputs, setChangedInputs] = useState({});

    useEffect(() => {
        getWiTargetSku();
        getWiTargetSkuNow()
    }, []);

    const getWiTargetSku = () => {
        const target_month = year + '/' + month;
        getTargetSkuApi(target_month, cust_id, (data, status) => {
            if (status === 200) {
                console.log(data)
                setTargetSkusOneAgo(data.TargetSkusOneAgo);
                setTargetSkusTwoAgo(data.TargetSkusTwoAgo);
            } else {
                console.error("Error fetching data:", status);
            }
        });
    }

    const getWiTargetSkuNow = () => {
        const target_month = year + '/' + month;
        getCurrentSkuApi(target_month, cust_id, (data, status) => {
            if (status === 200) {
                console.log(data)
                setTargetSkuNow(data.TargetSkuNow);
            } else {
                console.error("Error fetching data:", status);
            }
        })
    }

    const onChangeInput = (e, sku) => {
        const {value} = e.target;
        setChangedInputs(prev => ({
            ...prev,
            [sku]: value
        }));
    }

    const renderSkuRow = (sku, index) => {
        const targetTwoAgo = targetSkusTwoAgo.find(item => item.sku === sku.sku);
        const targetTwoAgoSale = targetTwoAgo ? targetTwoAgo.target_sale : 0;
        const targetNow = targetSkuNow.find(item => item.sku === sku.sku);
        const targetNowSale = targetNow ? targetNow.target_sale : 0;

        return (
            <tr key={index}>
                <td>{sku.sku}</td>
                <td>ชื่อสินค้า {index + 1}</td> {/* คุณอาจต้องเปลี่ยนแปลงเพื่อให้แสดงชื่อสินค้าที่ถูกต้อง */}
                <td>{targetTwoAgoSale !== 0 ? targetTwoAgoSale : '-'}</td>
                <td>{sku.target_sale !== 0 ? sku.target_sale : '-'}</td>
                <td>
                    <input
                        type="number"
                        className={'form-control'}
                        value={changedInputs[sku.sku] !== undefined ? changedInputs[sku.sku] : targetNowSale}
                        onChange={(e) => onChangeInput(e, sku.sku)}
                    />
                </td>
            </tr>
        );
    }

    return (
        <Content>
            <button onClick={() => console.log(changedInputs)}></button>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <ShopNameComponent name={cust_name} code={cust_id}/>
                        <div className={'card'}>
                            <div className={'card-body'}>
                                <div className={'d-flex justify-content-start align-items-center'}>
                                    <h5>รายการสินค้าสั่งซ้ำ</h5>
                                </div>
                                <div className={'table-responsive'}>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>รหัสสินค้า</th>
                                            <th>ชื่อสินค้า</th>
                                            <th>สองเดือนก่อนหน้า</th>
                                            <th>เดือนก่อนหน้า</th>
                                            <th>จำนวนที่จะขาย</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            targetSkusOneAgo.length === 0 && targetSkusTwoAgo.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5}>ไม่มีข้อมูล</td>
                                                </tr>
                                            ) : (
                                                targetSkusOneAgo.map((sku, index) => renderSkuRow(sku, index))
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className={'d-flex justify-content-end'}>
                                    <button className={'btn btn-primary'}>
                                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                                        <span>บันทึก</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default RepeatOrders;