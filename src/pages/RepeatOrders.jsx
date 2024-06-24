import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import {CreateCurrentSkuApi, getCurrentSkuApi, getTargetSkuApi} from "../api/wi_target_sku.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {AlertSuccess} from "../dialogs/AlertSuccess.js";
import {AlertError} from "../dialogs/AlertError.js";
import Loading from "../components/Loading.jsx";

function RepeatOrders() {
    const {year, month, cust_id, cust_name} = useParams();
    const [oneAgo, setOneAgo] = useState([]);
    const [twoAgo, setTwoAgo] = useState([]);
    const [all, setAll] = useState([]);
    const [currentSku, setCurrentSku] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getWiTargetSku();
        getWiTargetSkuNow();

    }, []);

    const getWiTargetSku = () => {
        const target_month = year + '/' + month;
        getTargetSkuApi(target_month, cust_id, (data, status) => {
            if (status === 200) {
                setOneAgo(data.TargetSkusOneAgo);
                setTwoAgo(data.TargetSkusTwoAgo);
                setAll(data.TargetSkusAll);
            } else {
                //
            }
            setLoading(false)
        });
    };

    const getWiTargetSkuNow = () => {
        const target_month = year + '/' + month;
        getCurrentSkuApi(target_month, cust_id, (data, status) => {
            if (status === 200) {
                setCurrentSku(data.TargetSkuNow)
            } else {
                //
            }
        });
    };

    const findSkuSale = (skuId, skuList) => {
        const sku = skuList.find(item => item.sku_id === skuId);
        return sku ? sku.sku_sale : '-';
    };

    const onChangeInput = (e, sku_id) => {
        const value = e.target.value;
        setCurrentSku(prevState => {
            const skuExists = prevState.find(item => item.sku === sku_id);
            if (skuExists) {
                return prevState.map(item =>
                    item.sku === sku_id ? {...item, target_sale: value} : item
                );
            } else {
                return [...prevState, {sku: sku_id, target_sale: value}];
            }
        });
    };


    const onSave = () => {
        const formattedSku = currentSku.map(item => ({
            sku: item.sku,
            target_sale: parseInt(item.target_sale)
        }));

        CreateCurrentSkuApi(cust_id, `${year}/${month}`, formattedSku, (data, status) => {
            status === 200 ? AlertSuccess('สำเร็จ',data.message) : AlertError('เกิดข้อผิดพลาด',data.message);
        });
    };


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
                                            <th>สองเดือนก่อนหน้า</th>
                                            <th>เดือนก่อนหน้า</th>
                                            <th>จำนวนที่จะขาย</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            loading ? (
                                                <tr>
                                                    <td colSpan={5}><Loading/></td>
                                                </tr>
                                            ) : (
                                                all.length > 0 ? (
                                                    all.map((sku, index) => (
                                                        <tr key={index}>
                                                            <td className={'text-left'}
                                                                style={{minWidth: 250, maxWidth: 270, textWrap: 'wrap'}}>
                                                                <p>{sku.sku_name}</p>
                                                                <span style={{
                                                                    fontSize: 12,
                                                                    color: "gray"
                                                                }}>รหัสสินค้า : {sku.sku_id}</span>
                                                            </td>
                                                            <td>{findSkuSale(sku.sku_id, twoAgo)}</td>
                                                            <td>{findSkuSale(sku.sku_id, oneAgo)}</td>
                                                            <td>
                                                                {
                                                                    currentSku.length > 0 ? (
                                                                        <input
                                                                            type="number"
                                                                            className="form-control w-100"
                                                                            value={
                                                                                currentSku.find(c => c.sku === sku.sku_id)
                                                                                    ? currentSku.find(c => c.sku === sku.sku_id).target_sale
                                                                                    : 0
                                                                            }
                                                                            onChange={(e) => onChangeInput(e, sku.sku_id)}
                                                                        />
                                                                    ) : (
                                                                        <input
                                                                            type="number"
                                                                            className="form-control w-100"
                                                                            value={0}
                                                                            onChange={(e) => onChangeInput(e, sku.sku_id)}
                                                                        />
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5}>ไม่มีข้อมูล</td>
                                                    </tr>
                                                )
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className={'d-flex justify-content-end'}>
                                    <button className={'btn btn-primary'} onClick={onSave}>
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
