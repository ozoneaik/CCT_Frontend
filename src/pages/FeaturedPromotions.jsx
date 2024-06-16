import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ListTargetProApi} from "../api/wi_target_pro_api.js";

function FeaturedPromotions() {

    const {year, month, cust_id} = useParams();
    const [promotions, setPromotions] = useState([]);
    useEffect(() => {
        getWiTargetPro()
    }, []);

    const getWiTargetPro = () => {
        ListTargetProApi(year, month, cust_id, (data) => {
            setPromotions(data.listTargetPro);
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

    const removeProductRow = (index) => {
        const newPromotion = promotions.filter((_, i) => i !== index);
        setPromotions(newPromotion);
    };

    const D = ()=>{
        console.log(promotions)
    }


    return (
        <Content>
            <button onClick={D}>Check Data</button>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ShopNameComponent name="นายเอ" code="10021512"/>
                        <div className="card">
                            <div className="card-body">
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
                                        {promotions.length > 0 ? (
                                            promotions.map((promotion, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="pro_sku"
                                                            value={promotion.pro_sku}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {promotion.pro_name ? promotion.pro_name : 'กรอกรหัสสินค้าที่ถูกต้อง'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <textarea name="pro_desc" className={'form-control'} cols="30"
                                                                  rows="3" value={promotion.pro_desc} onChange={(e) => handleInputChange(index, e)}></textarea>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => removeProductRow(index)}
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">
                                                    <span>ไม่มีข้อมูล</span>
                                                </td>
                                            </tr>
                                        )}
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

export default FeaturedPromotions;