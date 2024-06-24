import axiosClient from "../axios.js";

export function userListApi(onPassed) {
    axiosClient.get('/list-users').then(({data, status}) => {
        onPassed(data, status)
    }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status);
        }
    );
}

export function updateUserApi(UserUpdate, onPassed) {
    axiosClient.put(`update-user`, {UserUpdate})
        .then(({data, status}) => {
            onPassed(data, status)
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status)
        }
    );
}

export function deleteUserApi(UserId, onPassed) {
    axiosClient.delete(`delete-user/${UserId}`)
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status)
        }
    )
}

export function createUserApi(User, onPassed) {
    axiosClient.post(`create-user`, {User, onPassed})
        .then(({data, status}) => {
            onPassed(data, status);
        }).catch((error) => {
            let Error = error.response;
            onPassed(Error.data, Error.status);
        }
    )
}