import AsyncStorage from "@react-native-async-storage/async-storage"
import { AxiosInstance } from "axios";
import { useState } from "react";
import { useEffect } from "react"
import { api } from "../services/api";

interface UseApiProps{
    (): {http:AxiosInstance}
}
const useApi:UseApiProps = () => {
    const [http,setHttp] = useState<AxiosInstance>({} as AxiosInstance)
    useEffect(()=>{ 
        (async ()=>{
            const token = await AsyncStorage.getItem("@Spotty:token")
            api.defaults.headers.authorization = `Bearer ${token}`
            setHttp(api)
            console.log(api.defaults.headers)
        })();
    },[api])

    return { http }
}

export {useApi}