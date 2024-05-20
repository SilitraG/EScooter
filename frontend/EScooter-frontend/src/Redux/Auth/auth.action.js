import axios from "axios"
import api from "../../config/api"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCES, REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCES } from "./auth.actionType"

export const loginUserAction=(loginData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data}=await api.post(`/login`, loginData.data)

        if(data.token){
            localStorage.setItem("token", data.token)
        }
        console.log("login succes", data)
        dispatch({type:LOGIN_SUCCES, payload:data.jwt})

    } catch (error) {
        console.log("------", error)
        dispatch({type:LOGIN_FAILURE, payload:error})
    }
}

export const registerUserAction=(loginData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try{
        const {data}=await api.post(`/register`, loginData.data)

        if(data.jwt){
            localStorage.setItem("jwt",data.jwt)

        }
        console.log("register succes", data)
        dispatch({type:REGISTER_SUCCES, payload:data.jwt})

    } catch (error) {
        console.log("------", error)
        dispatch({type:REGISTER_FAILURE, payload:error})
    }
}