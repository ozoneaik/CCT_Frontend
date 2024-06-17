import {ButtonComponent} from "../../components/ButtonComponent.jsx";
import {useState} from "react";
import {getSkuNameApi} from "../../api/wi_target_pro_api.js";
import {SaveTargetBoothSkuApi} from "../../api/wi_target_booth.js";
import {AlertSuccess} from "../../dialogs/AlertSuccess.js";
import {AlertError} from "../../dialogs/AlertError.js";

// eslint-disable-next-line react/prop-types
const ModalBoothSku = ({index, booth_sku, title, booth_id,onPassed}) => {

    const [boothSku, setBoothSku] = useState(booth_sku);

    const addBoothSkuRow = () => {
        const newBoothSku = {id_targetbooth: booth_id, skucode: '', skuqty: 0, skuname: ''};
        setBoothSku([...boothSku, newBoothSku]);
    };

    const handleInputChange = (index, event) => {
        const {name, value} = event.target;
        const newBoothSku = [...boothSku];
        newBoothSku[index][name] = value;
        setBoothSku(newBoothSku);
    };

    const handleInputChangeSkuCode = (index, event) => {
        let { name, value } = event.target;
        let newBoothSku = [...boothSku];
        let updatedBoothSku = [...boothSku];
        console.log('newBoothSku', newBoothSku);
        newBoothSku[index][name] = value;
        setBoothSku(newBoothSku);
        setTimeout(() => {
            getSkuNameApi(value, (sku_name) => {
                updatedBoothSku[index]['skuname'] = sku_name;
                setBoothSku(updatedBoothSku);
            });
        }, 1000);
    };

    const removeBoothSkuRow = (index) => {
        const newBoothSku = boothSku.filter((_, i) => i !== index);
        setBoothSku(newBoothSku);
    };

    const onSaveBoothSku = () =>{
        SaveTargetBoothSkuApi(boothSku,(data,status)=>{
            if (status === 200){
                AlertSuccess();
                onPassed(true)
            }else{
                AlertError();
            }
        })
    }

    return (
        <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1"
             role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">รายละเอียดบูธ {title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <table className={'table'}>
                            <thead>
                            <tr>
                                <th>รหัสสินค้า</th>
                                <th>จำนวนสินค้า</th>
                                <th>#</th>
                            </tr>
                            </thead>
                            <tbody>
                            <>
                                {
                                    boothSku.length > 0 ? (
                                        boothSku.map((sku, index) => (
                                            <tr key={index}>
                                                <td className={'text-left'}>
                                                    <label htmlFor="skucode">{sku.skuname ? sku.skuname : 'ชื่อสินค้า'}</label>
                                                    <input type="text" defaultValue={sku.skucode}
                                                           className={'form-control'}
                                                           placeholder={'กรุณากรอกชือสินค้าที่ถูกต้อง'}
                                                           name={'skucode'}
                                                    onChange={(e)=>handleInputChangeSkuCode(index,e)}/>
                                                </td>
                                                <td>
                                                    <input type="number" className={'form-control'}
                                                           name={'skuqty'}
                                                           defaultValue={sku.skuqty}
                                                           onChange={(e)=>handleInputChange(index,e)}
                                                    />
                                                </td>
                                                <td>
                                                    <ButtonComponent BtnStyle={'btn-sm btn-danger'}
                                                                     Icon={'fa-trash'} onClick={()=>removeBoothSkuRow(index)}/>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3}>ไม่มีข้อมูล</td>
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td colSpan={3}>
                                        <ButtonComponent Icon={'fa-plus'} title={'เพิ่ม'} onClick={addBoothSkuRow}/>
                                    </td>
                                </tr>
                            </>

                            </tbody>
                        </table>

                    </div>
                    <div className="modal-footer">
                        <ButtonComponent title={'บันทึก'} BtnStyle={'btn-primary'}
                                         onClick={onSaveBoothSku}/>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                            <i className={'fa fa-solid fa-remove mr-2'}></i>
                            <span>ปิด</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalBoothSku;