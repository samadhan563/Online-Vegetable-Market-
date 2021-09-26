import axios from 'axios'
const BASE_URL = "http://localhost:8080/api/user"

class UserServices {
    registerNew(newUser) {
        return axios.post(BASE_URL + "/register-new-user", newUser);
    }
    userUpdate(userId) {
        return axios.post(BASE_URL + "/update-user-details", userId);
    }
    getDetailsOfLoggedInUser(userId) {
        return axios.post(BASE_URL + "/get-user-by-id", userId);
    }

    getUserProfile(userId) {
        return axios.get(BASE_URL + "/get-user-profile/" + userId);
    }


    addUserProfile(newUser) {
        return axios.post(BASE_URL + '/add-user-profile', newUser);
    }


    updateProfile(userId, userProfile) {
        return axios.put(BASE_URL + "/update-profile/" + userId, userProfile);
    }

    async fileUpload(file) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return await axios.post('http://localhost:8080/api/image/upload', file, config);
    }



    //user address 
    getUserAddress(userId) {
        return axios.get(BASE_URL + "/get-user-address/" + userId)
    }
    //user address 
    updateAddress(userId, userAddress) {
        return axios.put(BASE_URL + "/update-user-address/" + userId, userAddress)
    }

}

export default new UserServices();
