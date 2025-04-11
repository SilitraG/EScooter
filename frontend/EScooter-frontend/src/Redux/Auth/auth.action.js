import api from "../../config/api"

export const LOGIN_REQUEST="LOGIN_REQUEST";
export const LOGIN_SUCCES="LOGIN_SUCCES";
export const LOGIN_FAILURE="LOGIN_FAILURE";

export const REGISTER_REQUEST="REGISTER_REQUEST";
export const REGISTER_SUCCES="REGISTER_SUCCES";
export const REGISTER_FAILURE="REGISTER_FAILURE";

export const loginUserAction=(loginData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
        const {data}=await api.post(`/login`, loginData.data)

        if(data.token){
            localStorage.setItem("token", data.token)
        }
        console.log("login succes", data)
        dispatch({type:LOGIN_SUCCES, payload:data.token})

    } catch (error) {
        console.log("------", error)
        dispatch({type:LOGIN_FAILURE, payload:error})
    }
}

export const registerUserAction=(loginData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try{
        const {data}=await api.post(`/register`, loginData.data)

        if(data.token){
            localStorage.setItem("token",data.token)

        }
        console.log("register succes", data)
        dispatch({type:REGISTER_SUCCES, payload:data.token})

    } catch (error) {
        console.log("------", error)
        dispatch({type:REGISTER_FAILURE, payload:error})
    }
}