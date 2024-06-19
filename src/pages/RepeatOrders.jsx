import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import { getCurrentSkuApi, getTargetSkuApi } from "../api/wi_target_sku.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RepeatOrders() {
    const { year, month, cust_id, cust_name } = useParams();
    const [oneAgo, setOneAgo] = useState([]);
    const [twoAgo, setTwoAgo] = useState([]);
    const [all, setAll] = useState([]);

    useEffect(() => {
        getWiTargetSku();
        getWiTargetSkuNow();
    }, []);

    const getWiTargetSku = () => {
        const target_month = year + '/' + month;
        getTargetSkuApi(target_month, cust_id, (data, status) => {
            if (status === 200) {
                console.log(data);
                setOneAgo(data.TargetSkusOneAgo);
                setTwoAgo(data.TargetSkusTwoAgo);
                setAll(data.TargetSkusAll);
            } else {
                console.error("Error fetching data:", status);
            }
        });
    };

    const getWiTargetSkuNow = () => {
        const target_month = year + '/' + month;
        getCurrentSkuApi(target_month, cust_id, (data, status) => {
            if (status === 200) {
                console.log(data);
            } else {
                console.error("Error fetching data:", status);
            }
        });
    };

    const findSkuSale = (skuId, skuList) => {
        const sku = skuList.find(item => item.sku_id === skuId);
        return sku ? sku.sku_sale : '-';
    };

    return (
        <Content>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <ShopNameComponent name={cust_name} code={cust_id} />
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
                                            {/*<th>ชื่อสินค้า</th>*/}
                                            <th>สองเดือนก่อนหน้า</th>
                                            <th>เดือนก่อนหน้า</th>
                                            <th>จำนวนที่จะขาย</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {all.length > 0 ? (
                                            all.map((sku, index) => (
                                                <tr key={index}>
                                                    <td className={'text-left'} style={{minWidth: 250,maxWidth: 270,textWrap: 'wrap'}} >
                                                        <p>{sku.sku_name}</p>
                                                        <span style={{fontSize: 12,color: "gray"}}>รหัสสินค้า : {sku.sku_id}</span>
                                                    </td>
                                                    <td>{findSkuSale(sku.sku_id, twoAgo)}</td>
                                                    <td>{findSkuSale(sku.sku_id, oneAgo)}</td>
                                                    <td>
                                                        <input style={{maxWidth: 100}} type="number" className={'form-control'} />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5}>No data available</td>
                                            </tr>
                                        )}
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
