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
        list();

    }, [])

    const DATEPICKER = (savedDateTime) =>{
        flatpickr("#myID", {
            "locale": Thai,
            defaultDate: savedDateTime,
            plugins: [
                new monthSelectPlugin({
                    shorthand: true, //defaults to false
                    dateFormat: "m/Y", //defaults to "F Y"
                    altFormat: "M/Y", //defaults to "F Y"
                    theme: "light" // defaults to "light"
                })
            ], onChange: (selectedDates, dateStr) => {
                setDateTime(dateStr)
                console.log('hello world')
                localStorage.setItem('DateTime', dateStr);
            }
        });
    }

    const formatDate = (date) => {
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // เพิ่ม 1 เพราะ getMonth() คืนค่าตั้งแต่ 0-11
        const year = date.getFullYear();
        return `${month}/${year}`;
    };

    const list = ()=>{
        getMaTargetCustApi((data,status)=>{
            if (status === 200){
                setTargetCusts(data.TargetCust);
                setTargetCustTotal(data.TargetCustTotal);
                setCustAllTotal(data.CustAllTotal)
                if (data.TargetCust.length === 0){
                    setShowLoading(false)
                }
            }
            console.log(data)
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
                    <CardComponent title={'จำนวนร้านค้าทั้งหมด'} background={'bg-primary'} icon={'fa-shop'} val={custAllTotal}/>
                    <CardComponent title={'จำนวนร้านค้าเป้าหมาย'} background={'bg-warning'} icon={'fa-location-dot'} val={targetCustTotal}/>
                    <CardComponent title={'จำนวนร้านค้าออกบูท'} background={'bg-success'} icon={'fa-person-booth'} val={5}/>
                    <CardComponent title={'จำนวนร้านค้าอบรม'} background={'bg-info'} icon={'fa-square-poll-vertical'} val={10}/>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <div className={'card card-danger card-outline'}>
                        <div className={'card-body'}>
                            <div className={'table-responsive'} style={{maxHeight: '69dvh'}}>
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
                                                        <p className={'mb-0 mr-3'}>10000</p>
                                                        <Link to={`/TargetShops/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
                                                              className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>30</td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>10</p>
                                                        <Link to={`RepeatOrders/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`} className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>5</p>
                                                        <Link to={`NewProducts/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
                                                              className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>2</p>
                                                        <Link to={`/FeaturePromotion/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
                                                              className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>1</p>
                                                        <Link to={`Booths/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
                                                              className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>-</p>
                                                        <Link to={`Training/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`}
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