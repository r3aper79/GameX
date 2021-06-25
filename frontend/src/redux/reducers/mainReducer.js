import {combineReducers} from "redux";
import usersReducer from './userReducer'
import hardwareReducer from './hardwareReducer'
import gamesReducer from './gamesReducer'
import cartReducer from "./cartReducer";



const mainReducer = combineReducers({
    userReducer: usersReducer,
    hardwareReducer: hardwareReducer,
    gamesReducer: gamesReducer,
    cartReducer: cartReducer
})

export default mainReducer