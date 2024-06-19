import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CreateWiTargetSaleApi, ListApi, ListTargetApi, UpdateWiTargetSaleApi} from "../api/wi_target_sale_api.js";
import {AlertSuccess} from "../dialogs/AlertSuccess.js";
import {AlertError} from "../dialogs/AlertError.js";
import {AlertInfo} from "../dialogs/AlertInfo.js";
import TableComponent from "../components/TableComponent.jsx";
import CardContentComponent from "../components/CardContentComponent.jsx";
import {ButtonComponent} from "../components/ButtonComponent.jsx";

function TargetShops() {
    // กำหนดหัวตาราง
    const theadTarget = ['ป-ด','ยอดขาย'];
    const dataFieldsTarget = ['target_month', 'target_sale']; // ฟิลด์ที่ต้องการแสดงในตาราง
    const theadHistory = ['ป-ด','จำนวนสินค้า', 'ยอดขาย'];
    const dataFieldsHistory = ['target_month', 'product_count', 'target_sale']; // ฟิลด์ที่ต้องการแสดงในตาราง
    //เก็บค่าเป้าหมาย
    const [target_sale, setTarget_sale] = useState(0);
    // รายการเป้าหมาย
    const [listTarget, setListTarget] = useState([]);
    const [list, setList] = useState([]);
    //ดึงเดือน ปี และ รหัสลุกค้า จาก uri
    const {year, month, cust_id,cust_name} = useParams();

    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        getWiTargetSale();
        getAllTargetSale();
    }, []);

    const getWiTargetSale = ()=> {
        ListTargetApi(year,month,cust_id,(listTarget)=>{
            setListTarget(listTarget)
            if (!listTarget.length > 0){
                setShowLoading(false)
            }
        });
    }

    const getAllTargetSale = () =>{
        ListApi(cust_id,(list)=>{
            setList(list)
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
                if (Error.status === 422){
                    let DataToUpdate = Error.data.wi_target_sale;
                    DataToUpdate.target_sale = target_sale;
                    AlertInfo('error ' + Error.status, Error.data.message,DataToUpdate,'wi_target_sale/update',
                        (data,uri)=>{
                            UpdateWiTargetSaleApi(data,uri).then(({data,status}) => {
                                if (status === 200) {
                                    AlertSuccess('สำเร็จ',data.message);
                                    getWiTargetSale();
                                    getAllTargetSale();
                                }
                            }).catch((error) => {
                                let Error = error.response;
                                AlertError('error ' + Error.status, Error.data.message);
                            })
                        })
                }else{
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
                                <ButtonComponent title={'บันทึก'} onClick={()=>onClickSave()}/>
                            </div>
                            <TableComponent thead={theadTarget} tbody={listTarget} dataFields={dataFieldsTarget} showLoading={showLoading}/>
                        </CardContentComponent>
                        <CardContentComponent CardHeader={true} CardBody={true} HeaderTitle={'ประวัติ'}>
                            <TableComponent thead={theadHistory} tbody={list} dataFields={dataFieldsHistory} showLoading={showLoading}/>
                        </CardContentComponent>
                    </div>
                </div>
            </div>

        </Content>
    );
}

export default TargetShops;