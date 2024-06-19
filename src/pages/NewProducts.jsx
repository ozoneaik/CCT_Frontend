import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import {useEffect, useState} from "react";
import {ButtonComponent} from "../components/ButtonComponent.jsx";
import {useParams} from "react-router-dom";
import {CreateTargetNewSkuApi, getTargetNewSku} from "../api/wi_target_new_sku_api.js";
import {getSkuNameApi} from "../api/wi_target_pro_api.js";
import {AlertSuccess} from "../dialogs/AlertSuccess.js";
import {AlertError} from "../dialogs/AlertError.js";

function NewProducts() {
    const [skus, setSkus] = useState([]);

    const {year,month,cust_id,cust_name} = useParams();

    useEffect(() => {
        getTargetNewSkus();
    }, []);

    const getTargetNewSkus = ()=>{
       getTargetNewSku(year,month,cust_id,(data,status)=>{
           setSkus(status === 200 ? data.ListNewSkus : []);
       });
    }

    const addProductRow = () => {
        const newSku = {
            cust_id: cust_id,
            new_sku: '111',
            sku_name: 'สินค้า',
            new_target_sale: 0,
            new_target_month: year+'-'+month+'-01'};
        setSkus([...skus, newSku]);
    };

    const handleInputChangeSkuCode = (index, event) => {
        let { name, value } = event.target;
        let newSku = [...skus];
        let updatedSku = [...skus];
        console.log('newSku >> ', newSku);
        newSku[index][name] = value;
        setSkus(newSku);
        setTimeout(() => {
            getSkuNameApi(value, (sku_name) => {
                updatedSku[index]['sku_name'] = sku_name;
                setSkus(updatedSku);
            });
        }, 1000);

    }

    const handleInputChange = (index, event) => {
        const {name, value} = event.target;
        const newSkus = [...skus];
        newSkus[index][name] = value;
        setSkus(newSkus);
    };

    const removeProductRow = (index) => {
        const newSkus = skus.filter((_, i) => i !== index);
        setSkus(newSkus);
    };


    const onSave = ()=>{
        CreateTargetNewSkuApi(skus,(data,status)=>{
            status === 200 ? AlertSuccess(data.message) : AlertError(data.message,data.subMessage);
            getTargetNewSkus();
        });
    }
    return (
        <Content>
            <div className={'container'}>
                <ShopNameComponent name={cust_name} code={cust_id}/>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <div className={'card'}>
                            <div className={'card-body'}>
                                <div className={'d-flex justify-content-between align-items-center mb-3'}>
                                    <h5>รายการสินค้านำเสนอใหม่</h5>
                                    <ButtonComponent onClick={addProductRow} Icon={'fa-plus'}
                                                     BtnStyle={'btn-primary rounded-pill'}/>
                                </div>
                                <div className={'table-responsive'}>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>รหัสสินค้า</th>
                                            <th>ชื่อสินค้า</th>
                                            <th>จำนวนที่จะขาย</th>
                                            <th>#</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            skus.length > 0 ? (
                                                skus.map((sku, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className={'form-control'}
                                                                name="new_sku"
                                                                value={sku.new_sku}
                                                                onChange={(e) => handleInputChangeSkuCode(index, e)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <span>
                                                                {sku.sku_name}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                className={'form-control'}
                                                                name="new_target_sale"
                                                                value={sku.new_target_sale}
                                                                onChange={(e) => handleInputChange(index, e)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <ButtonComponent onClick={() => removeProductRow(index)}
                                                                             BtnStyle={'btn-danger btn-sm'}
                                                                             Icon={'fa-trash'}/>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <>
                                                <tr>
                                                    <td colSpan={4}>ไม่มีข้อมูล</td>
                                                </tr>
                                                </>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className={'d-flex justify-content-end'}>
                                    <ButtonComponent onClick={onSave} title={'บันทึก'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default NewProducts;
