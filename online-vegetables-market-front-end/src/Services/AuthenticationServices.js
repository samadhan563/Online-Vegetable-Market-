//import React, { Component } from 'react';
import axios from 'axios'
const BASE_URL = "http://localhost:8080/api/auth"

class AuthenticationServices {
    userLogin(loginRequest) {
    return axios.post(BASE_URL+ "/login",loginRequest);
    }
    
}

export default new AuthenticationServices();
