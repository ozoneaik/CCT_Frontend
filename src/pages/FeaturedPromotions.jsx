import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CreateTargetProApi, getSkuNameApi, ListTargetProApi} from "../api/wi_target_pro_api.js";
import {ButtonComponent} from "../components/ButtonComponent.jsx";
import CardContentComponent from "../components/CardContentComponent.jsx";
import {AlertSuccess} from "../dialogs/AlertSuccess.js";
import {AlertError} from "../dialogs/AlertError.js";
import Loading from "../components/Loading.jsx";

function FeaturedPromotions() {
    const {year, month, cust_id,cust_name} = useParams();
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getWiTargetPro()
    }, []);

    const getWiTargetPro = () => {
        ListTargetProApi(year, month, cust_id, (data,status) => {
            setPromotions(status === 200 ? data.listTargetPro : []);
            setLoading(false);
        })
    }

    const addPromotionRow = () => {
        const newPromotion = {pro_sku: '', pro_name: '', pro_desc: ''};
        setPromotions([...promotions, newPromotion]);
    };

    const handleInputChange = (index, event) => {
        const {name, value} = event.target;
        const newPromotion = [...promotions];
        newPromotion[index][name] = value;
        setPromotions(newPromotion);
    };

    const handleInputChangeProSku = (index, event) => {
        let { name, value } = event.target;
        let newPromotion = [...promotions];
        let updatedPromotions = [...promotions];
        newPromotion[index][name] = value;
        setPromotions(newPromotion);
        updatedPromotions[index]['pro_month'] = `${year}-${month}-01`;
        updatedPromotions[index]['cust_id'] = cust_id;
        setTimeout(() => {
            getSkuNameApi(value, (sku_name) => {
                updatedPromotions[index]['pro_name'] = sku_name;
                setPromotions(updatedPromotions);
            });
        }, 1000);
    };

    const removeProductRow = (index) => {
        const newPromotion = promotions.filter((_, i) => i !== index);
        setPromotions(newPromotion);
    };

    const onSave = () => {
        CreateTargetProApi(promotions,year,month,(data,status)=>{
            if (status === 200){
                setPromotions(data.promotions)
                AlertSuccess('สำเร็จ',data.message);
            }else{
                AlertError('เกิดข้อผิดพลาด',data.message);
            }
        });
    }


    return (
        <Content>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ShopNameComponent name={cust_name} code={cust_id}/>
                        <CardContentComponent CardBody={true}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5>รายการโปรโมชั่นนำเสนอ</h5>
                                <button type="button" className="btn btn-primary rounded-pill"
                                        onClick={addPromotionRow}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>รหัสสินค้า</th>
                                        <th>ชื่อสินค้า</th>
                                        <th>รายละเอียดโปรโมชั่น</th>
                                        <th>#</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        loading ? (
                                            <tr>
                                                <td colSpan={4}><Loading/></td>
                                            </tr>
                                        ): (
                                            promotions.length > 0 ? (
                                                promotions.map((promotion, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input type="text" className="form-control"
                                                                   name="pro_sku" value={promotion.pro_sku}
                                                                   onChange={(e) => handleInputChangeProSku(index, e)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <span>{promotion.pro_name ? promotion.pro_name : 'กรอกรหัสสินค้าที่ถูกต้อง'}</span>
                                                        </td>
                                                        <td>
                                                    <textarea name="pro_desc" className={'form-control'} cols="30"
                                                              rows="3"
                                                              value={promotion.pro_desc}
                                                              onChange={(e) => handleInputChange(index, e)}>
                                                    </textarea>
                                                        </td>
                                                        <td>
                                                            <ButtonComponent onClick={() => removeProductRow(index)}
                                                                             Icon={'fa-trash'} BtnStyle={'btn-danger btn-sm'}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        <span>ไม่มีข้อมูล</span>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className={'d-flex justify-content-end'}>
                                <ButtonComponent onClick={onSave} title={'บันทึก'}/>
                            </div>
                        </CardContentComponent>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default FeaturedPromotions;