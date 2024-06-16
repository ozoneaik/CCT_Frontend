import Content from "../layouts/Content.jsx";
import ShopNameComponent from "../components/ShopNameComponent.jsx";
import {useState} from "react";

function NewProducts() {
    const [products, setProducts] = useState([
        { id: '11517', name: 'PUMPKIN ดอกสว่านโรตารี่ 13x600mm', quantity: 0 }
    ]);

    const addProductRow = () => {
        const newProduct = { id: '', name: '', quantity: 0 };
        setProducts([...products, newProduct]);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newProducts = [...products];
        newProducts[index][name] = value;
        setProducts(newProducts);
    };

    const removeProductRow = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    return (
        <Content>
            <div className={'container'}>
                <ShopNameComponent name="นายเอ" code={'10021512'} />
                <div className={'row'}>
                    <div className={'col-12'}>
                        <div className={'card'}>
                            <div className={'card-body'}>
                                <div className={'d-flex justify-content-between align-items-center mb-3'}>
                                    <h5>รายการสินค้านำเสนอใหม่</h5>
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-pill"
                                        onClick={addProductRow}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
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
                                        {products.map((product, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={'form-control'}
                                                        name="id"
                                                        value={product.id}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={'form-control'}
                                                        name="name"
                                                        value={product.name}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className={'form-control'}
                                                        name="quantity"
                                                        value={product.quantity}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                    />
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
                                        ))}
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
