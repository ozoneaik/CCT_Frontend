import axiosClient from "../axios.js";

export function getTargetTrainApi(target_month, cust_id, onPassed) {
    axiosClient.get(`wi_target_train/list_target_train/${target_month}/${cust_id}`)
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status);
        }
    );
}

export function CreateTargetTrainApi(target_month, cust_id, trainstart, trainend, onPassed) {
    axiosClient.post(`wi_target_train/create`, {
        target_month,
        cust_id,
        trainstart,
        trainend,
        train_desc: 's'
    })
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status)
        }
    );
}

export function UpdateTargetTrainDescApi(id,desc, onPassed) {
    axiosClient.put(`wi_target_train/update/${id}`,{
        desc
    })
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status)
        }
    );
}

export function DeleteTargetTrainApi(id, onPassed) {
    axiosClient.delete(`wi_target_train/delete/${id}`)
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status)
        }
    );
}