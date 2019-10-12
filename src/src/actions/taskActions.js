import axios from "axios";
import * as actions from '../utils/actionTypes';

const baseURL = `/api/v1`;
export function getAllTasks(){
    return dispatch => {
        return axios.get(`${baseURL}/ticket/?`,{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(data=>{
            let tasks = data.data.results;
            dispatch ({
                type: actions.GET_ALL_TASKS,
                payload : {
                    tasks
                } 
            })
        }).catch(err=>console.log(err))
    }
}

export function getTasksByCollection(collectionId){
    return dispatch => {
        return axios.get(`${baseURL}/ticket/?collection=${collectionId}`,{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(data=>{
            let tasks = data.data.results;
            dispatch ({
                type: actions.GET_TASKS_BY_COLLECTION,
                payload : {
                    tasks
                } 
            })
        }).catch(err=>console.log(err))
    }
}
export function getSingleTask(taskId){
    return dispatch => {
        return axios.get(`${baseURL}/ticket/${taskId}`,{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(data=>{
            let task = data.data;
            dispatch ({
                type: actions.GET_TASK,
                payload : {
                    task
                } 
            })
        }).catch(err=>console.log(err))
    }
}
export function changeTaskStatus(taskId , taskData){
    return dispatch => {
        return axios.put(`${baseURL}/ticket/${taskId}`,taskData,{
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(data=>{
            let task = data.data;
            dispatch ({
                type: actions.UPDATE_TASK_STATUS,
                payload : {
                    task
                } 
            })
        }).catch(err=>console.log(err))
    }
}

export function createTask(taskBody){
    return dispatch => {
        return axios.post(`${baseURL}/ticket/`,taskBody, {
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(data=>{
            let task = data.data;
            dispatch ({
                type: actions.CREATE_TASK,
                payload : {
                    task
                } 
            })
        }).catch(err=>console.log(err))
    }
}