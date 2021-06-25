const initialState = {
    allHardwares: [],
    preLoader: true,
    hardwareInCart:false
}

const hardwareReducer = (state = initialState, action) =>{
    switch(action.type) {
        case 'LOAD_HARDWARES':
            return {
                ...state, 
                allHardwares: action.payload,
                preLoader: false
            }
        case 'SET_IN_CART':
            return {
                ...state, 
                hardwareInCart:action.payload
            }
            
        default:
            return state
    }
}

export default hardwareReducer