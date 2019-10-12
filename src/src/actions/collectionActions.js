import axios from "axios";
import * as actions from '../utils/actionTypes';

const baseURL = `/api/v1`;

export function getAllCollections(){
    return dispatch => {
        return axios.get(`${baseURL}/ticket/collections`,{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(data=>{
            let collections = data.data.results;
            dispatch ({
                type: actions.GET_ALL_COLLECTIONS,
                payload : {
                    collections
                } 
            })
        }).catch(err=>console.log(err))
    }
}
export function createCollection(postData){
    return dispatch => {
        return axios.post(`${baseURL}/ticket/collections`,postData,{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(data=>{
            let collection = data.data;
            dispatch ({
                type: actions.CREATE_COLLECTION,
                payload : {
                    collection
                } 
            })
        }).catch(err=>console.log(err))
    }
}