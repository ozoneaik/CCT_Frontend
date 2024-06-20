import Content from "../layouts/Content.jsx";
import flatpickr from "flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect/index.js";
import "flatpickr/dist/plugins/monthSelect/style.css";
import "flatpickr/dist/flatpickr.min.css";
import {Thai} from "flatpickr/dist/l10n/th.js"
import {useEffect, useState} from "react";
import CardComponent from "../components/CardComponent.jsx";
import {Link} from "react-router-dom";
import {getMaTargetCustApi} from "../api/ma_target_cust_api.js";
import Loading from "../components/Loading.jsx";

function Main() {
    const [DateTime, setDateTime] = useState('');
    const [targetCusts, setTargetCusts] = useState([]);
    const [targetCustTotal, setTargetCustTotal] = useState(0);
    const [custAllTotal, setCustAllTotal] = useState(0);

    const [showLoading, setShowLoading] = useState(true);


    useEffect(() => {
        // setDateTime(formatDate(new Date()));
        let savedDateTime = localStorage.getItem('DateTime') || formatDate(new Date());
        setDateTime(savedDateTime);
        DATEPICKER(savedDateTime);
        list(1);

    }, [])

    const DATEPICKER = (savedDateTime) => {

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // เดือน 0-11

        // กำหนดวันที่เริ่มต้นและสิ้นสุด
        const minDate = new Date(currentYear, 0, 1); // 1 มกราคม ของปีนี้
        const maxDate = new Date(currentYear, currentMonth + 1, 1); // เดือนถัดจากปัจจุบัน


        flatpickr("#myID", {
            "locale": Thai,
            defaultDate: savedDateTime,
            enable: [
                {
                    from: minDate,
                    to: maxDate
                }
            ],
            plugins: [
                new monthSelectPlugin({
                    shorthand: true, //defaults to false
                    dateFormat: "m/Y", //defaults to "F Y"
                    altFormat: "M/Y", //defaults to "F Y"
                    theme: "light" // defaults to "light"
                })
            ], onChange: (selectedDates, dateStr) => {
                setDateTime(dateStr)
                localStorage.setItem('DateTime', dateStr);
                onClickList(1,dateStr)
            }
        });
    }

    const formatDate = (date) => {
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // เพิ่ม 1 เพราะ getMonth() คืนค่าตั้งแต่ 0-11
        const year = date.getFullYear();
        return `${month}/${year}`;
    };

    const list = (target) => {
        let target_month = new Date();
        target_month = target_month.getFullYear() + '-' +
            ('0' + (target_month.getMonth() + 1)).slice(-2) + '-' + '01'
        getMaTargetCustApi(target, target_month, (data, status) => {
            console.log(data)
            if (status === 200) {
                setCustAllTotal(data.CustAllTotal)
                setTargetCusts(data.TargetCust)
                setTargetCustTotal(data.TargetCustTotal)
            }
        })
    }

    const onClickList = (target,TerMonth=DateTime) => {
        setTargetCusts([]);
        let [month, year] = TerMonth.split('/'); // แยกปีและเดือน
        let target_month = `${year}-${month}-01`; // รวมปี, เดือน, และวันที่
        console.log(target_month); // จะได้ผลลัพธ์เป็น '2024-06-01'
        getMaTargetCustApi(target, target_month, (data, status) => {
            console.log(data)
            if (status == 200) {
                setTargetCusts(data.TargetCust)
            }
        })
    }

    return (
        <Content>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <div className={'d-flex justify-content-end'}>
                            <div className="input-group mb-3" style={{maxWidth: 300}}>
                                <input type="text" id={'myID'} className="form-control" style={{background: '#fff'}}
                                       placeholder="Recipient's username"
                                       aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">
                                    <i className="fa-solid fa-calendar-days"></i>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'row'}>
                    <CardComponent title={'จำนวนร้านค้าทั้งหมด'} background={'bg-primary'} icon={'fa-shop'}
                                   val={custAllTotal} onClick={() => onClickList(0)}/>
                    <CardComponent title={'จำนวนร้านค้าเป้าหมาย'} background={'bg-warning'} icon={'fa-location-dot'}
                                   val={targetCustTotal} onClick={() => onClickList(1)}/>
                    <CardComponent title={'จำนวนร้านค้าออกบูท'} background={'bg-success'} icon={'fa-person-booth'}
                                   val={5}/>
                    <CardComponent title={'จำนวนร้านค้าอบรม'} background={'bg-info'} icon={'fa-square-poll-vertical'}
                                   val={10}/>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <div className={'card card-danger card-outline'}>
                        <div className={'card-body'}>
                            <div className={'table-responsive'}
                                 style={{maxHeight: '69dvh', overflowY: 'auto'}}>
                                <table className={'table table-bordered table-striped'}>
                                    <thead className={'thead-sticky'}>
                                    <tr>
                                        <th className={'D'}>ร้านค้า</th>
                                        <th>เป้าร้านค้าที่จะทำ</th>
                                        <th>จำนวนสินค้า</th>
                                        <th>สินค้าที่จะสั่งซ้ำ</th>
                                        <th>สินค้านำเสนอใหม่</th>
                                        <th>โปรที่นำเสนอ</th>
                                        <th>บูธ</th>
                                        <th>อบรม</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {targetCusts.length > 0 ? (
                                        targetCusts.map((TargetCust, index) => (
                                            <tr key={index}>
                                                <td className={'text-left D'}>
                                                    <p className={'mb-0'}>{TargetCust.custid}</p>
                                                    <p className={'mb-0'}>{TargetCust.custname}</p>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>{parseFloat(TargetCust.target_sale).toLocaleString()}</p>
                                                        <Link
                                                            to={`/TargetShops/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
                                                            className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span>-</span>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>{parseFloat(TargetCust.sku_count).toLocaleString()}</p>
                                                        <Link
                                                            to={`RepeatOrders/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
                                                            className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>{TargetCust.new_sku_count}</p>
                                                        <Link
                                                            to={`NewProducts/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
                                                            className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>{TargetCust.sku_pro_count}</p>
                                                        <Link
                                                            to={`/FeaturePromotion/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
                                                            className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>{TargetCust.sku_booth_count}</p>
                                                        <Link
                                                            to={`Booths/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
                                                            className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>{TargetCust.sku_train_count}</p>
                                                        <Link
                                                            to={`Training/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
                                                            className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={10}>
                                                {
                                                    showLoading === true ? (
                                                        <Loading/>
                                                    ) : (
                                                        <span>No data available</span>
                                                    )
                                                }
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
        </Content>
    );
}

export default Main;