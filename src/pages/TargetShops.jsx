import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";


function TargetShops( ) {
    return (
        <Content>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <ShopNameComponent name={'นายเอ'} code={'10021512'}/>
                        <div className={'card'}>
                            <div className={'card-body'}>
                                <div className={'d-flex justify-content-end align-items-center my-3'}>
                                    <span className={'mr-3'}>เป้าที่จะทำ</span>
                                    <input type="number" className={'form-control mr-3'} style={{maxWidth: 300}}/>
                                    <button className={'btn btn-primary'}>บันทึก</button>
                                </div>
                                <div className={'table-responsive'}>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>ป-ด</th>
                                            <th>จำนวนสินค้า</th>
                                            <th>ยอดขาย</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>2023-06</td>
                                            <td>20</td>
                                            <td>8900</td>
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

export default TargetShops;