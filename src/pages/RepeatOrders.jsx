import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";


function RepeatOrders() {
    return (
        <Content>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <ShopNameComponent name={'นายเอ'} code={'10021512'}/>
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
                                            <th>ชื่อสินค้า</th>
                                            <th>2023-06</th>
                                            <th>2023-05</th>
                                            <th>จำนวนที่จะขาย</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>10151</td>
                                            <td>PUMPKIN-PRO ตลับเมตร ORIGIN 5ม.x19มม. PRO-59190R</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>
                                                <input type="number" className={'form-control'}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={'d-flex justify-content-end'}>
                                    <button type={'button'} className={'btn btn-primary'}>บันทึก</button>
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