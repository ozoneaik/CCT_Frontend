import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";

function FeaturedPromotions() {
    return (
        <Content>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <ShopNameComponent name={'นายเอ'} code={'10021512'}/>
                        <div className={'card'}>
                            <div className={'card-body'}>
                                <div className={'d-flex justify-content-between align-items-center mb-3'}>
                                    <h5>รายการโปรโมชั่นนำเสนอ</h5>
                                    <button type="button" className="btn btn-primary rounded-pill"
                                            data-toggle="modal" data-target="#exampleModal">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                                <div className={'table-responsive'}>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>รหัสสินค้า</th>
                                            <th>ชื่อสินค้่า</th>
                                            <th>รายละเอียดโปรโมชั่น</th>
                                            <th>#</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>11517</td>
                                            <td>PUMPKIN ดอกสว่าน โรตารี่ 13x60mm</td>
                                            <td>
                                                <textarea name="" id="" rows="1"
                                                          className={'form-control'}></textarea>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-sm btn-danger">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>

                                            </td>
                                        </tr>
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