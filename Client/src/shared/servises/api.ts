import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const HttpCode = {
  UNAUTHORIZED: 401,
};

export const axiosApi: AxiosInstance = axios.create();

axiosApi.interceptors.request.use(
    async (config) : Promise<AxiosRequestConfig> => {
        const token = localStorage.getItem('accessKey'); 
        
        config.headers = {
                "authorization": token
            }
        
        return config
    }, 
    error => {
        Promise.reject(error)
    }
)

axiosApi.interceptors.response.use((response) => {
        return response
    }, function (error) {
        if(HttpCode.UNAUTHORIZED === error.response.status){
            localStorage.removeItem("accessKey"); 
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)