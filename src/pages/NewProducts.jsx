import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";

function NewProducts() {
    return (
        <Content>
            <div className={'container'}>
                <ShopNameComponent name="นายเอ" code={'10021512'}/>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <div className={'card'}>
                            <div className={'card-body'}>
                                <div className={'d-flex justify-content-between align-items-center mb-3'}>
                                    <h5>รายการสินค้านำเสนอใหม่</h5>
                                    <button type="button" className="btn btn-primary rounded-pill"
                                            data-toggle="modal" data-target="#exampleModal">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1"
                                         role="dialog" aria-labelledby="exampleModalLabel"
                                         aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">เพิ่มรายการสินค้า</h5>
                                                    <button type="button" className="close"
                                                            data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    ...
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary"
                                                            data-dismiss="modal">Close
                                                    </button>
                                                    <button type="button" className="btn btn-primary">Save
                                                        changes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                        <tr>
                                            <td>11517</td>
                                            <td>PUMPKIN ดอกสว่านโรตารี่ 13x600mm</td>
                                            <td>
                                                <input type="number" className={'form-control'}/>
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

export default NewProducts;