import ShopNameComponent from "../../components/ShopNameComponent.jsx";
import Content from "../../layouts/Content.jsx";
import {useEffect, useState} from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/plugins/monthSelect/style.css";
import "flatpickr/dist/flatpickr.min.css";
import {Thai} from "flatpickr/dist/l10n/th.js";
import CardContentComponent from "../../components/CardContentComponent.jsx";
import {useParams} from "react-router-dom";
import {CreateTargetBoothApi, DeleteTargetBoothApi, getTargetBoothApi} from "../../api/wi_target_booth_api.js";
import {ButtonComponent} from "../../components/ButtonComponent.jsx";
import {AlertSuccess} from "../../dialogs/AlertSuccess.js";
import {AlertError} from "../../dialogs/AlertError.js";
import {AlertQuestion} from "../../dialogs/AlertInfo.js";
import ModalBoothSku from "./ModalBoothSku.jsx";
import Loading from "../../components/Loading.jsx";

function Booths() {
    const {year, month, cust_id,cust_name} = useParams();
    const minDate = `${year}-${month}-01`;
    const maxDate = `${year}-${month}-31`;
    const [loading, setLoading] = useState(true);

    const [booths, setBooths] = useState([]);
    const [DateTime, setDateTime] = useState();

    useEffect(() => {
        DATERANGE();
        getWiTargetBooth();
    }, []);

    const DATERANGE = () => {
        flatpickr("#DateRange", {
            "locale": Thai,
            minDate: minDate,
            maxDate : maxDate,
            mode: 'range',
            plugins: [],
            onChange: (selectedDates, dateStr) => {
                setDateTime(dateStr);
            }
        });
    };

    const getWiTargetBooth = () => {
        getTargetBoothApi(year, month, cust_id, (data,status) => {
            setBooths(status === 200 ? data.listTargetBooths : []);
            setLoading(false);
        });
    };

    const saveBooth = () => {
        const [startdate, enddate] = DateTime.split(' ถึง ');
        const target_month = year + '/' + month;
        CreateTargetBoothApi(startdate, enddate, target_month, cust_id, (data, status) => {
            status === 200 ? AlertSuccess('สำเร็จ',data.message) : AlertError('เกิดข้อผิดพลาด',data.message)
            getWiTargetBooth();
        })
    }

    const Delete = (id,target_month) => {
        AlertQuestion('แน่ใจหรือไม่', '', (confirm) => {
            if (confirm) {
                DeleteTargetBoothApi(id,target_month, (data, status) => {
                    status === 200 ? AlertSuccess(data.message) : AlertError('เกิดข้อผิดพลาด',data.message)
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
                        <ShopNameComponent name={cust_name} code={cust_id}/>
                        <CardContentComponent>
                            <div className={'d-flex justify-content-between align-items-center mb-3'}>
                                <h5>ระยะเวลาออกบูธ</h5>
                                <div className={'d-flex w-100'} style={{maxWidth: 500}}>
                                    <input type="date" id={'DateRange'} className={'form-control mr-3 bg-light'}/>
                                    <div className={'w-25'}>
                                        <ButtonComponent BtnStyle={'w-100 btn-primary'} onClick={saveBooth} title={'บันทึก'}/>
                                    </div>
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
                                        loading ? (
                                            <tr>
                                                <td colSpan={3}><Loading/></td>
                                            </tr>
                                        ) : (
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
                                                            <ButtonComponent onClick={() => Delete(booth.id,`${year}/${month}`)}
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