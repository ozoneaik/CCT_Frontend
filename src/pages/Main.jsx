import Content from "../layouts/Content.jsx";
import flatpickr from "flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect/index.js";
import "flatpickr/dist/plugins/monthSelect/style.css";
import "flatpickr/dist/flatpickr.min.css";
import {Thai} from "flatpickr/dist/l10n/th.js"
import {useEffect, useState} from "react";
import CardComponent from "../components/CardComponent.jsx";
import {Link} from "react-router-dom";

function Main() {

    const [DateTime, setDateTime] = useState(new Date());
    useEffect(() => {
        flatpickr("#myID", {
            "locale": Thai,
            defaultDate: new Date().toISOString(),
            plugins: [
                new monthSelectPlugin({
                    shorthand: true, //defaults to false
                    dateFormat: "m/Y", //defaults to "F Y"
                    altFormat: "M/Y", //defaults to "F Y"
                    theme: "light" // defaults to "light"
                })
            ], onChange: (selectedDates, dateStr, instance) => {
                setDateTime(dateStr)
            }
        });
    }, [])

    const C = () => {
        console.log(DateTime)
    }
    return (
        <Content>
            <button onClick={C}>hert</button>
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
                    <CardComponent title={'จำนวนร้านค้าทั้งหมด'} background={'bg-primary'} icon={'fa-shop'} val={100}/>
                    <CardComponent title={'จำนวนร้านค้าเป้าหมาย'} background={'bg-warning'} icon={'fa-location-dot'} val={20}/>
                    <CardComponent title={'จำนวนร้านค้าออกบูท'} background={'bg-success'} icon={'fa-person-booth'} val={5}/>
                    <CardComponent title={'จำนวนร้านค้าอบรม'} background={'bg-info'} icon={'fa-square-poll-vertical'} val={10}/>
                </div>
            </div>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <div className={'card card-danger card-outline'}>
                        <div className={'card-body'}>
                            <div className={'table-responsive'}>
                                <table className={'table table-bordered'}>
                                    <thead>
                                    <tr>
                                        <th>ร้านค้า</th>
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
                                    <tr>
                                        <td className={'text-left'}>
                                            <p className={'mb-0'}>10021512</p>
                                            <p className={'mb-0'}>ร้าน นาย เอ</p>
                                        </td>
                                        <td>
                                            <div className={'d-flex justify-content-center align-items-center'}>
                                                <p className={'mb-0 mr-3'}>10000</p>
                                                <Link to={'/TargetShops'} className={'btn btn-sm btn-primary'}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                            </div>

                                        </td>
                                        <td>30</td>
                                        <td>
                                            <div className={'d-flex justify-content-center align-items-center'}>
                                                <p className={'mb-0 mr-3'}>10</p>
                                                <Link to={'RepeatOrders'} className={'btn btn-sm btn-primary'}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                            </div>
                                        </td>

                                        <td>
                                            <div className={'d-flex justify-content-center align-items-center'}>
                                                <p className={'mb-0 mr-3'}>5</p>
                                                <Link to={'NewProducts'} className={'btn btn-sm btn-primary'}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={'d-flex justify-content-center align-items-center'}>
                                                <p className={'mb-0 mr-3'}>2</p>
                                                <Link to={'FeaturePromotion'} className={'btn btn-sm btn-primary'}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={'d-flex justify-content-center align-items-center'}>
                                                <p className={'mb-0 mr-3'}>1</p>
                                                <Link to={'Booths'} className={'btn btn-sm btn-primary'}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={'d-flex justify-content-center align-items-center'}>
                                                <p className={'mb-0 mr-3'}>-</p>
                                                <Link to={'Training'} className={'btn btn-sm btn-primary'}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
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