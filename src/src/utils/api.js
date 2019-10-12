import axios from 'axios';
import { toast } from 'react-toastify';

const baseUrl = 'http://localhost:5000';

export function login  (requestBody , cb) {
    
    axios.post(`${baseUrl}/auth/login`, requestBody)
    .then((data)=>{
        cb(data.data)
    }).catch((err)=>{
        console.log(err)
        toast(err.msg ? err.msg : 'An error occured',{type:toast.TYPE.ERROR})
    })

}