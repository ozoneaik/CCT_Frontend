import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import {getCurrentSkuApi, getTargetSkuApi} from "../api/wi_target_sku.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function RepeatOrders() {
    const {year, month, cust_id, cust_name} = useParams();

    useEffect(() => {
        getWiTargetSku();
        getWiTargetSkuNow()
    }, []);

    const getWiTargetSku = () => {
        const target_month = year + '/' + month;
        getTargetSkuApi(target_month, cust_id, (data, status) => {
            if (status === 200) {
                console.log(data)
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
            } else {
                console.error("Error fetching data:", status);
            }
        })
    }

    return (
        <Content>
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
                                        <tr>
                                            <td>1111</td>
                                            <td>1111</td>
                                            <td>1111</td>
                                            <td>1111</td>
                                            <td>1111</td>
                                        </tr>
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