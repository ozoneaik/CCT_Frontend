import axiosClient from "../axios.js";

export function getTargetBoothApi(year, month, cust_id, onPassed) {
    axiosClient.get(`/wi_target_booth/list_target_booth/${year}/${month}/${cust_id}`)
        .then(({data,status}) => {
            onPassed(data,status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data,Error.status);
        }
    );
}

export function CreateTargetBoothApi(startdate, enddate, booth_month, custid, onPassed) {
    axiosClient.post(`wi_target_booth/create`, {startdate, enddate, booth_month, custid})
        .then(({data, status}) => {
            onPassed(data, status)
        }).then((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status)
        }
    );
}

export function DeleteTargetBoothApi(id, onPassed) {
    axiosClient.delete(`wi_target_booth/delete/${id}`)
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status)
        }
    );
}

export function SaveTargetBoothSkuApi(boothSku, onPassed) {
    axiosClient.post(`/wi_target_booth/create-boothSku`, {boothSku})
        .then(({data, status}) => {
            onPassed(data,status)
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status)
        }
    );
}