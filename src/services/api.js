import axios from "axios"
import store from '../store'
import router from '../router'

export default () => {
    const customAxios = axios.create ({
        baseURL: 'http://192.168.11.175:8186'
    })

    // Step-2: Create request, response & error handlers
    const requestHandler = request => {
        // Token will be dynamic so we can use any app-specific way to always   
        // fetch the new token before making the call
        request.headers.Authorization = `Bearer ${store.state.token}`
    
        return request;
    };

    const responseHandler = response => {
        if (response.status === 403) {
           // window.location = '/login';
        }
    
        return response;
    };
    
    const errorHandler = error => {
        // store.state.isUserLoggedIn = false
        // store.state.token = null
        // store.state.user = null
        // router.push({
        //     name: 'login'
        //   })
        return Promise.reject(error);
    };
    
    // Step-3: Configure/make use of request & response interceptors from Axios
    // Note: You can create one method say configureInterceptors, add below in that,
    // export and call it in an init function of the application/page.
    customAxios.interceptors.request.use(
        (request) => requestHandler(request),
        (error) => errorHandler(error)
    );
    
    customAxios.interceptors.response.use(
        (response) => responseHandler(response),
        (error) => errorHandler(error)
     );
     
    return customAxios
}
