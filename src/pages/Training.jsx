import ShopNameComponent from "../components/ShopNameComponent.jsx";
import Content from "../layouts/Content.jsx";
import {useEffect} from "react";

import flatpickr from "flatpickr";
import "flatpickr/dist/plugins/monthSelect/style.css";
import "flatpickr/dist/flatpickr.min.css";
import {Thai} from "flatpickr/dist/l10n/th.js"


function Training() {

    useEffect(()=>{
        DATERANGE();
    },[]);


    const DATERANGE = ()=>{
        flatpickr("#DateRange", {
            "locale": Thai,
            defaultDate: new Date().toISOString(),
            mode : 'range',
            plugins: [
            ], onChange: (selectedDates, dateStr, instance) => {
            }
        });
    }
    return (
        <Content>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <ShopNameComponent name={'นายเอ'} code={'10021512'}/>
                        <div className={'card'}>
                            <div className={'card-body'}>
                                <div className={'d-flex justify-content-between align-items-center mb-3'}>
                                    <h5>ระยะเวลาอบรม</h5>
                                    <div className={'d-flex w-100'} style={{maxWidth: 500}}>
                                        <input type="date" id={'DateRange'} className={'form-control mr-3 bg-light'}/>
                                        <button className={'btn btn-primary'} style={{maxWidth: 300}}>
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
                                            <th>รายละเอียด </th>
                                            <th>#</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>2024-06-01 ถึง 2024-06-10</td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default Training;