import axios from "axios";
import * as actions from '../utils/actionTypes';
import {toast} from 'react-toastify';

const baseURL = `/api/v1`;
export function login(userData){
    return dispatch => {
        return axios.post(`${baseURL}/account/login`,userData)
         .then(data => {
            if(data.status === 200){
                localStorage.setItem('token',data.data.token)
                localStorage.setItem('is_manager',data.data.is_manager)
                 dispatch ({
                     type: actions.LOGIN_SUCCESS,
                     payload : {
                         user : data.data,
                         isAuthenticated : true
                     } 
                 })
            }
            else{
                toast('Login Failed',{type : toast.TYPE.ERROR})
            }
         })
         .catch(err => {
            toast('Login Failed',{type : toast.TYPE.ERROR})
             console.log(err);
         })
 
     }
}
export function createUser(userData){
    return dispatch => {
        return axios.post(`${baseURL}/account/create`,userData,{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
         .then(data => {
            if(data.status === 201){
                 dispatch ({
                     type: actions.CREATE_USER,
                     payload : {
                         user : data.data,
                     } 
                 })
            }
         })
         .catch(err => {
             console.log(err);
         })
 
     }
}
export function getAllUsers(){
    return dispatch => {
        return axios.get(`${baseURL}/account/users`,{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
         .then(data => {   
            dispatch ({
                type: actions.GET_ALL_USERS,
                payload : {
                    users : data.data,
                } 
            })    
         })
         .catch(err => {
             console.log(err);
         })
 
     }
}

export function logout(){
    return dispatch => {
        localStorage.removeItem('token');
        dispatch ({
            type: actions.LOGOUT,
            payload : {
                user : {},
                isAuthenticated : false
            } 
        })
    }
}