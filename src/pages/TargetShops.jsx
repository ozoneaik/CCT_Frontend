import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CreateWiTargetSaleApi, ListApi, ListTargetApi, UpdateWiTargetSaleApi} from "../api/wi_target_sale_api.js";
import {AlertSuccess} from "../dialogs/AlertSuccess.js";
import {AlertError} from "../dialogs/AlertError.js";
import {AlertInfo} from "../dialogs/AlertInfo.js";
import CardContentComponent from "../components/CardContentComponent.jsx";
import {ButtonComponent} from "../components/ButtonComponent.jsx";
import Loading from "../components/Loading.jsx";

function TargetShops() {
    const [target_sale, setTarget_sale] = useState(0);
    const [listTarget, setListTarget] = useState([]);
    const [list, setList] = useState([]);
    const {year, month, cust_id, cust_name} = useParams();
    const [loadingFirst, setLoadingFirst] = useState(true);
    const [loadingSecond, setLoadingSecond] = useState(true);

    useEffect(() => {
        getWiTargetSale();
        getAllTargetSale();
    }, []);

    const getWiTargetSale = () => {
        ListTargetApi(year, month, cust_id, (listTarget) => {
            console.log('listTarget >> ', listTarget);
            setListTarget(listTarget)
            setLoadingFirst(false)
        });
    }

    const getAllTargetSale = () => {
        ListApi(cust_id, (list) => {
            console.log('list >> ', list)
            setList(list)
            setLoadingSecond(false)
        })
    }

    const onClickSave = () => {
        CreateWiTargetSaleApi(year, month, cust_id, target_sale)
            .then(({data, status}) => {
                if (status === 200) {
                    console.log('200')
                    let message = data.message;
                    AlertSuccess('สำเร็จ', message)
                    setListTarget([]);
                    getWiTargetSale();
                    getAllTargetSale();
                }
            }).catch((error) => {
            let Error = error.response;
            if (Error.status === 422) {
                let DataToUpdate = Error.data.wi_target_sale;
                DataToUpdate.target_sale = target_sale;
                AlertInfo('error ' + Error.status, Error.data.message, DataToUpdate, 'wi_target_sale/update',
                    (data, uri) => {
                        UpdateWiTargetSaleApi(data, uri).then(({data, status}) => {
                            if (status === 200) {
                                AlertSuccess('สำเร็จ', data.message);
                                getWiTargetSale();
                                getAllTargetSale();
                            }
                        }).catch((error) => {
                            let Error = error.response;
                            AlertError('error ' + Error.status, Error.data.message);
                        })
                    })
            } else {
                console.log('hello')
                AlertError('error ' + Error.status, Error.data.message);
            }
        })

    }
    return (
        <Content>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <ShopNameComponent name={cust_name} code={cust_id}/>
                        <CardContentComponent CardHeader={true} HeaderTitle={'เป้าหมาย'} CardBody={true}>
                            <div className={'d-flex justify-content-end align-items-center my-3'}>
                                <span className={'mr-3'}>เป้าที่จะทำ</span>
                                <input type="number" onChange={(e) => {
                                    setTarget_sale(e.target.value)
                                }} className={'form-control mr-3'} style={{maxWidth: 300}}/>
                                <ButtonComponent title={'บันทึก'} onClick={() => onClickSave()}/>
                            </div>
                            <div className={'table-responsive'}>
                                <table className={'table table-bordered'}>
                                    <thead>
                                    <tr>
                                        <th>ปี - เดือน</th>
                                        <th>ยอดขาย</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        loadingFirst ? (
                                            <tr>
                                                <td colSpan={2}><Loading/></td>
                                            </tr>
                                        ) : (
                                            listTarget.length > 0 ? (
                                                listTarget.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.target_month}</td>
                                                        <td>{item.target_sale}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={2}>ไม่มีข้อมูล</td>
                                                </tr>
                                            )
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </CardContentComponent>
                        <CardContentComponent CardHeader={true} CardBody={true} HeaderTitle={'ประวัติ'}>
                            <div className={'table-responsive'}>
                                <table className={'table table-bordered'}>
                                    <thead>
                                    <tr>
                                        <th>ปี - เดือน</th>
                                        <th>จำนวนสินค้า</th>
                                        <th>ยอดขาย</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        loadingSecond ? (
                                            <tr>
                                                <td colSpan={3}><Loading/></td>
                                            </tr>
                                        ) : (
                                            list.length > 0 ? (
                                                list.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.target_month}</td>
                                                        <td>-</td>
                                                        <td>{item.target_sale}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3}>ไม่มีข้อมูล</td>
                                                </tr>
                                            )
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </CardContentComponent>
                    </div>
                </div>
            </div>

        </Content>
    );
}

export default TargetShops;