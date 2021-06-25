const initialState = {
    userLogged:null,
    favouritesList:null,
    buyList:null,
    greetings: false
    // reloadMessages:false,
    // Socket:null,
    // reloadFriendList:false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_USER':
            localStorage.setItem("userLogged", JSON.stringify({userName: action.payload.userName, avatar: action.payload.avatar, imageUrl:action.payload.imageUrl}))
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                userLogged: action.payload,
                favouritesList: action.payload.favouritesList,
                greetings: true         
            }
        case 'LOG_OUT':
            localStorage.removeItem('userLogged')
            localStorage.removeItem('token')
            return {
                userLogged: action.payload
            }              
        case "RELOAD_FRIEND_LIST":
            return{
                ...state,
                userLogged:{...state.userLogged,friends:action.payload}
            }
        case "RELOAD_FAVORITES_LIST":
            return{
                ...state,
                favouritesList: action.payload.favouritesList  
            }
        case "LOAD_BUYS":
            return{
                ...state,
                buyList: action.payload  
            }
        case 'BACK_WELCOME':
            return {
                ...state,
                greetings: false
            }
        // case 'RELOAD_MESSAGES':
        //     return{
        //         ...state,
        //         reloadMessages:!state.reloadMessages
        //     }
        // case 'SOCKET_IO':
        //     return{
        //         ...state,
        //         Socket:action.payload
        //     }
        // case 'RELOAD_FRIENDLIST_SOCKET':
        //     return{
        //         ...state,
        //         reloadFriendList:!state.reloadFriendList
        //     }
        default:
            return state
    }
}

export default userReducer