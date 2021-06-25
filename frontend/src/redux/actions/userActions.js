import axios from "axios"
import swal from 'sweetalert'

const host= 'https://game-x-arg.herokuapp.com/'
// const host= 'http://localhost:4000/'

const userActions = {
    logUser: (userInfo) => {
        return async (dispatch, getState) => {
           try {
                const respuesta = await axios.post(host+'api/user/login', userInfo)
                if (!respuesta.data.success) {
                    return respuesta.data
                }
                dispatch({
                    type: "LOG_USER",
                    payload: respuesta.data.respuesta
                    
                })
                return `Welcome back, ${respuesta.data.respuesta.userName}!`
            }catch(error) {
                return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            } 
        }
    },
    newUser: (userInfo) => {
        return async (dispatch, getState) => {
           try {
                const respuesta = await axios.post(host+'api/user/signup', userInfo)
                if (!respuesta.data.success) {
                    return respuesta.data.error
                }
                dispatch({
                    type: "LOG_USER",
                    payload: respuesta.data.respuesta
                    
                })
                return `Welcome ${respuesta.data.respuesta.userName}!`               
            }catch(error) {
                return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            } 
        }
    },
    forcedLoginByLS: (userLS) => {
        return async (dispatch, getState) => {
            try {
                const respuesta = await axios.get(host+'api/user/loginLS', {
                headers: {
                    'Authorization': 'Bearer '+userLS.token
                }
            })
                dispatch({type: 'LOG_USER', payload: {
                    ...respuesta.data.respuesta,
                    token: userLS.token
                }})
            } catch(error) {
                if (!error.response) {
                    return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
                } else if (error.response.status && error.response.status > 399 && error.response.status < 499) {
                    swal("Invalid Token", "Please Log in again", "error")
                    dispatch({type: 'LOG_OUT', payload: null})
                } 
            }           
        }
    },
    changeRol: (userName, token) => {
        return async () => {
            try {
                const respuesta = await axios.put(host+`api/user/changeRol`,userName, {
                headers: {
                    'Authorization': 'Bearer '+ token
                }
            })
                if(!respuesta.data.success){
                    return respuesta.data                   
                }else{
                    return respuesta.data.respuesta.userName
                }
            } catch(error) {
                return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            }           
        }
    },
    removeUserInfo: () => {
        return (dispatch, getState) => {
            dispatch({type: 'LOG_OUT', payload:null})
        }
    },
    searchUsers: (userName)=>{
        return async(dispatch, getState) => {
            try{
                const token = localStorage.getItem('token')
                const users = await axios.put(host+'api/user',{userName},{
                    headers: {
                        'Authorization': 'Bearer '+ token
                    }
                })
                if(users.data.success){
                    let usersFiltered = []
                    if(users.data.response.length > 0){
                        users.data.response.map(user =>{
                            const {avatar,chats,country,friends,userName,_id, email} = user
                            const userFiltered = {avatar,chats,country,friends,userName,_id, email}
                            usersFiltered.push(userFiltered)
                            return null
                        })
                    }
                        
                    return usersFiltered 
                }else{
                    return ["There are no results for this search"]
                }
            }catch(e){
                console.log(e)
            }
        }
    },
    addToMyList: (sendedData, token, id) => {
        return async (dispatch, getstate) => {
            try {
                const response = await axios.put(host+`api/user/addToList/${id}`, {sendedData}, {
                    headers: {
                    'Authorization': 'Bearer '+token
                    }
                })            
                dispatch({
                    type: "RELOAD_FAVORITES_LIST",
                    payload: response.data.response
                    
                })
                return response.data.response               
            }catch(error) {
                return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            } 
        }
    }, 
    getProductsOnList: (id, props) => {
        return async () => {
           try {
            const response = await axios.get(host+`api/user/mylist/${id}`,)   
            return  response.data.response
            } catch {
               return props.push('/serverdown') 
            }
        }
    }, 
    backWelcome: () => {
        return(dispatch, getstate) => {
            dispatch({type: 'BACK_WELCOME'})
        }
    }
}

export default userActions