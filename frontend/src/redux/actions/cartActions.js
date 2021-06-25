const cartActions = {
    addToCart: (products) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type: 'ADD_TO_CART', payload: products})
            } catch (error) {             
                console.log(error);
                alert('error en addToCart')
            }        
        }
    },
    deleteToCart: (products) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type: 'DELETE_TO_CART', payload: products})
            } catch (error) {             
                console.log(error);
                alert('error en deleteToCart')
            }        
        }
    },
    setCartLS:(products) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type: 'SET_CART_LS', payload: products})
            } catch (error) {             
                console.log(error);
                alert('error en setCartLS')
            }        
        }
    },
    proceedToPayment:(products) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type: 'CLOSE_BUY_ORDER', payload: products})
            } catch (error) {             
                console.log(error);
                alert('error en proceedToPayment')
            }        
        }
    },
    deleteCart: (products) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type: 'DELETE_CART'})
            } catch (error) {             
                console.log(error);
                alert('error en proceedToPayment')
            }        
        }
    },
}
export default cartActions