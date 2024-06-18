import ShopNameComponent from "../components/ShopNameComponent.jsx";
import Content from "../layouts/Content.jsx";
import {useEffect, useState} from "react";

import flatpickr from "flatpickr";
import "flatpickr/dist/plugins/monthSelect/style.css";
import "flatpickr/dist/flatpickr.min.css";
import {Thai} from "flatpickr/dist/l10n/th.js"
import {useParams} from "react-router-dom";
import {
    CreateTargetTrainApi,
    DeleteTargetTrainApi,
    getTargetTrainApi,
    UpdateTargetTrainDescApi
} from "../api/wi_target_train_api.js";
import {ButtonComponent} from "../components/ButtonComponent.jsx";
import {AlertSuccess} from "../dialogs/AlertSuccess.js";
import {AlertError} from "../dialogs/AlertError.js";
import {AlertQuestion} from "../dialogs/AlertInfo.js";


function Training() {

    const [trains, setTrains] = useState([]);
    const [DateTime, setDateTime] = useState("");
    const {year, month, cust_id} = useParams();

    useEffect(() => {
        DATERANGE();
        getTargetTrain();
    }, []);


    const DATERANGE = () => {
        flatpickr("#DateRange", {
            "locale": Thai,
            // defaultDate: new Date().toISOString(),
            mode: 'range',
            plugins: [], onChange: (selectedDates, dateStr) => {
                setDateTime(dateStr);
            }
        });
    }

    const getTargetTrain = () => {
        const target_month = year + '/' + month;
        getTargetTrainApi(target_month, cust_id, (data, status) => {
            if (status === 200) {
                setTrains(data.TargetTrains)
                console.log(data)
            } else {
                setTrains([])
            }
        })
    }

    const onDelete = (id) => {
        AlertQuestion('ต้องการลบ', 'คุณแน่ใจหรือไม่', (Bool) => {
            if (Bool) {
                DeleteTargetTrainApi(id, (data, status) => {
                    status === 200 ? AlertSuccess(data.message) : AlertError(data.message)
                    getTargetTrain();
                })
            }
        })
    }

    const onChangeDesc = (index, value) => {
        setTrains(prevTrains => {
            const newTrains = [...prevTrains];
            newTrains[index].train_desc = value;
            return newTrains;
        });
    }

    const onUpdate = (id, desc) => {
        console.log(id,desc)
        UpdateTargetTrainDescApi(id,desc,(data,status)=>{
            status === 200 ? AlertSuccess(data.message) : AlertError(data.message)
            getTargetTrain();
        });
    }

    const onSave = () => {
        const [trainstart, trainend] = DateTime.split(' ถึง ');
        const target_month = year + '/' + month;
        console.log(trainstart, trainend, target_month);
        CreateTargetTrainApi(target_month, cust_id, trainstart, trainend, (data, status) => {
            status === 200 ? AlertSuccess(data.message) : AlertError('เกิดข้อผิดพลาด',data.message);
            getTargetTrain();
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
                                        <input type="date" id={'DateRange'} className={'form-control mr-3 bg-light'}
                                               onChange={(e) => setDateTime(e.target.value)}/>
                                        <ButtonComponent onClick={onSave} title={'บันทึก'}
                                                         BtnStyle={'btn-primary w-25'}/>
                                    </div>
                                </div>
                                <div className={'table-responsive'}>
                                    <table className={'table table-bordered'}>
                                        <thead>
                                        <tr>
                                            <th>เริ่ม-จบ</th>
                                            <th>รายละเอียด</th>
                                            <th>#</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {
                                            trains.length > 0 ? (
                                                trains.map((train, index) => (
                                                    <tr key={index}>
                                                        <td>{train.trainstart} ถึง {train.trainend}</td>
                                                        <td>
                                                            <textarea name="" id="" cols="30" rows="2"
                                                                      className={'form-control'}
                                                                      defaultValue={train.train_desc}
                                                                      onChange={(e) => onChangeDesc(index, e.target.value)}>

                                                            </textarea>
                                                        </td>
                                                        <td>
                                                            <ButtonComponent Icon={'fa-floppy-disk'}
                                                                             BtnStyle={'btn-sm btn-primary'}
                                                                             onClick={() => onUpdate(train.id, train.train_desc)}/>
                                                            &nbsp;
                                                            <ButtonComponent Icon={'fa-trash'}
                                                                             BtnStyle={'btn-danger btn-sm'}
                                                                             onClick={() => onDelete(train.id)}/>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3}>ไม่มีข้อมูล</td>
                                                </tr>
                                            )
                                        }
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