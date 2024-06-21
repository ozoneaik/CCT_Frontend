import Content from "../layouts/Content.jsx";
import flatpickr from "flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect/index.js";
import "flatpickr/dist/plugins/monthSelect/style.css";
import "flatpickr/dist/flatpickr.min.css";
import {Thai} from "flatpickr/dist/l10n/th.js"
import {useEffect, useState} from "react";
import CardComponent from "../components/CardComponent.jsx";
import {Link} from "react-router-dom";
import {getMaTargetBootApi, getMaTargetCustApi, getMaTargetTrainApi} from "../api/ma_target_cust_api.js";
import Loading from "../components/Loading.jsx";

function Main() {
    const [DateTime, setDateTime] = useState('');
    const [targetCusts, setTargetCusts] = useState([]);
    const [targetCustTotal, setTargetCustTotal] = useState(0);
    const [targetBoothTotal, setTargetBoothTotal] = useState(0);
    const [targetTrainTotal, setTargetTrainTotal] = useState(0);
    const [custAllTotal, setCustAllTotal] = useState(0);
    const [showLoading, setShowLoading] = useState(true);


    useEffect(() => {
        let savedDateTime = localStorage.getItem('DateTime') || formatDate(new Date());
        localStorage.setItem('DateTime', savedDateTime);
        setDateTime(savedDateTime);
        DATEPICKER(savedDateTime);
        onClickList(0, savedDateTime)
        onClickList(1, savedDateTime)


    }, [])

    const DATEPICKER = (savedDateTime) => {
        flatpickr("#myID", {
            "locale": Thai,
            defaultDate: savedDateTime,
            maxDate: new Date(),
            plugins: [
                new monthSelectPlugin({
                    shorthand: true,
                    dateFormat: "m/Y",
                    altFormat: "M/Y",
                    theme: "light"
                })
            ], onChange: (selectedDates, dateStr) => {
                setDateTime(dateStr)
                localStorage.setItem('DateTime', dateStr);
                onClickList(0, dateStr)
            }
        });
    }

    const formatDate = (date) => {
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${month}/${year}`;
    };

    const onClickList = (target, TarMonth = DateTime) => {
        setTargetCusts([]);
        let [month, year] = TarMonth.split('/');
        month = parseInt(month, 10);
        year = parseInt(year, 10);
        if (month === 12) {
            month = 1;
            year += 1;
        } else {
            month += 1;
        }
        setDateTime(`${('0' + month).slice(-2)}/${year}`);
        let target_month = `${year}-${('0' + month).slice(-2)}-01`;
        console.log('on Click List >> ', target_month);
        getMaTargetCustApi(target, target_month, (data, status) => {
            console.log(data);
            if (status === 200) {
                setCustAllTotal(data.CustAllTotal)
                if (target === 1) {
                    setTargetCustTotal(data.TargetCustTotal)
                }else{
                    setTargetBoothTotal(data.BoothAllTotal)
                    setTargetTrainTotal(data.TrainAllTotal)
                }
                setTargetCusts(data.TargetCust)
            }
        });
    }

    const onClickBooth = (target, TerMonth = DateTime) => {
        setTargetCusts([]);
        let [month, year] = TerMonth.split('/');
        month = parseInt(month, 10);
        year = parseInt(year, 10);
        if (month === 12) {
            month = 1;
            year += 1;
        } else {
            month += 1;
        }
        setDateTime(`${('0' + month).slice(-2)}/${year}`);
        let target_month = `${year}-${('0' + month).slice(-2)}-01`;
        console.log('on Click List >> ' , target_month);
        getMaTargetBootApi(target, target_month, (data, status) => {
            console.log(data);
            if (status === 200) {
                setTargetCusts(data.TargetCust)
            }
        });
    }

    const onClickTrain = (target, TerMonth = DateTime) => {
        setTargetCusts([]);
        let [month, year] = TerMonth.split('/');
        month = parseInt(month, 10);
        year = parseInt(year, 10);
        if (month === 12) {
            month = 1;
            year += 1;
        } else {
            month += 1;
        }
        setDateTime(`${('0' + month).slice(-2)}/${year}`);
        let target_month = `${year}-${('0' + month).slice(-2)}-01`;
        console.log('on Click List >> ' , target_month);
        getMaTargetTrainApi(target, target_month, (data, status) => {
            console.log(data);
            if (status === 200) {
                setTargetCusts(data.TargetCust)
            }
        });
    }


    return (
        <Content>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <div className={'d-flex justify-content-end'}>
                            <div className="input-group mb-3" style={{maxWidth: 300}}>
                                <input type="text"
                                       id={'myID'}
                                       className="form-control"
                                       style={{background: '#fff'}}
                                       placeholder="Recipient's username"
                                       aria-label="Recipient's username"
                                       aria-describedby="basic-addon2"
                                />
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
                    <CardComponent title={'จำนวนร้านค้าทั้งหมด'} background={'bg-primary'} icon={'fa-shop'} val={custAllTotal}
                                   onClick={() => onClickList(0, localStorage.getItem('DateTime'))}/>
                    <CardComponent title={'จำนวนร้านค้าเป้าหมาย'} background={'bg-warning'} icon={'fa-location-dot'} val={targetCustTotal}
                                   onClick={() => onClickList(1, localStorage.getItem('DateTime'))}/>
                    <CardComponent title={'จำนวนร้านค้าออกบูท'} background={'bg-success'} icon={'fa-person-booth'} val={targetBoothTotal}
                                   onClick={()=>onClickBooth(1, localStorage.getItem('DateTime'))}/>
                    <CardComponent title={'จำนวนร้านค้าอบรม'} background={'bg-info'} icon={'fa-square-poll-vertical'} val={targetTrainTotal}
                                   onClick={()=>onClickTrain(1, localStorage.getItem('DateTime'))}/>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <div className={'card card-danger card-outline'}>
                        <div className={'card-body'}>
                            <h6 className={'text-bold mb-3'}>เดือนเป้าหมาย {DateTime}</h6>
                            <div className={'table-responsive'} style={{maxHeight: '69dvh', overflowY: 'auto'}}>
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
                                                        <Link to={`/TargetShops/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`} className={'btn btn-xs btn-primary'}>
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
                                                        <Link to={`RepeatOrders/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`} className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>{TargetCust.new_sku_count}</p>
                                                        <Link to={`NewProducts/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`} className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>{TargetCust.sku_pro_count}</p>
                                                        <Link to={`/FeaturePromotion/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`} className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>{TargetCust.sku_booth_count}</p>
                                                        <Link to={`Booths/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`} className={'btn btn-xs btn-primary'}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={'d-flex justify-content-center align-items-center'}>
                                                        <p className={'mb-0 mr-3'}>{TargetCust.sku_train_count}</p>
                                                        <Link to={`Training/${DateTime}/${TargetCust.custid}/${TargetCust.custname}`} className={'btn btn-xs btn-primary'}>
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