import ShopNameComponent from "../../components/ShopNameComponent.jsx";
import Content from "../../layouts/Content.jsx";
import {useEffect, useState} from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/plugins/monthSelect/style.css";
import "flatpickr/dist/flatpickr.min.css";
import {Thai} from "flatpickr/dist/l10n/th.js";
import CardContentComponent from "../../components/CardContentComponent.jsx";
import {useParams} from "react-router-dom";
import {CreateTargetBoothApi, DeleteTargetBoothApi, getTargetBoothApi} from "../../api/wi_target_booth.js";
import {ButtonComponent} from "../../components/ButtonComponent.jsx";
import {AlertSuccess} from "../../dialogs/AlertSuccess.js";
import {AlertError} from "../../dialogs/AlertError.js";
import {AlertQuestion} from "../../dialogs/AlertInfo.js";
import ModalBoothSku from "./ModalBoothSku.jsx";

function Booths() {
    const {year, month, cust_id} = useParams();

    const [booths, setBooths] = useState([]);
    const [DateTime, setDateTime] = useState();

    useEffect(() => {
        DATERANGE();
        getWiTargetBooth();
    }, []);

    const DATERANGE = () => {
        flatpickr("#DateRange", {
            "locale": Thai,
            // defaultDate: [`${year}-${month}-1`, `${year}-${month}-5`],
            mode: 'range',
            plugins: [],
            onChange: (selectedDates, dateStr) => {
                setDateTime(dateStr);
            }
        });
    };

    const getWiTargetBooth = () => {
        getTargetBoothApi(year, month, cust_id, (data) => {
            console.log(data.listTargetBooths);
            setBooths(data.listTargetBooths);
        });
    };

    const saveBooth = () => {
        const [startdate, enddate] = DateTime.split(' ถึง ');
        const target_month = year + '/' + month;
        CreateTargetBoothApi(startdate, enddate, target_month, cust_id, (data, status) => {
            if (status === 200) {
                AlertSuccess('สำเร็จ', data.message)
                getWiTargetBooth();
            } else {
                AlertError('เกิดข้อผิดพลาด', data.message)
            }
        })
    }

    const Delete = (id) => {
        AlertQuestion('แน่ใจหรือไม่', '', (confirm) => {
            if (confirm) {
                DeleteTargetBoothApi(id, (data, status) => {
                    if (status === 200) {
                        AlertSuccess(data.message)
                    } else {
                        AlertError(data.message)
                    }
                    getWiTargetBooth();
                })
            }
        })

    }

    const updateBoothSkuData = (check) => {
        if (check){
            getWiTargetBooth();
        }
    };

    return (
        <Content>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <ShopNameComponent name={'นายเอ'} code={'10021512'}/>
                        <CardContentComponent>
                            <div className={'d-flex justify-content-between align-items-center mb-3'}>
                                <h5>ระยะเวลาออกบูธ</h5>
                                <div className={'d-flex w-100'} style={{maxWidth: 500}}>
                                    <input type="date" id={'DateRange'} className={'form-control mr-3 bg-light'}/>
                                    <button onClick={saveBooth} className={'btn btn-primary w-25'}>
                                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                                        <span>บันทึก</span>
                                    </button>
                                </div>
                            </div>
                            <div className={'table-responsive'}>
                                <table className={'table table-bordered'}>
                                    <thead>
                                    <tr>
                                        <th>เริ่ม-จบ</th>
                                        <th>จำนวนสินค้า</th>
                                        <th>#</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        booths.length > 0 ? (
                                            booths.map((booth, index) => (
                                                <tr key={booth.id}>
                                                    <td>{booth.startdate} ถึง {booth.enddate}</td>
                                                    <td>{booth.total_skuqty}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-sm btn-warning"
                                                                data-toggle="modal"
                                                                data-target={`#exampleModal${index}`}>
                                                            <i className="fa-solid fa-edit"></i>
                                                        </button>
                                                        &nbsp;
                                                        <ButtonComponent onClick={() => Delete(booth.id)}
                                                                         Icon={'fa-trash'}
                                                                         BtnStyle={'btn-sm bg-danger'}/>
                                                        <ModalBoothSku index={index} booth_sku={booth.get_booth_sku}
                                                                       title={`${booth.startdate} ถึง ${booth.enddate}`}
                                                                       booth_id={booth.id}
                                                        onPassed={(check)=>updateBoothSkuData(check)}/>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">ไม่มีข้อมูล</td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </CardContentComponent>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default Booths;