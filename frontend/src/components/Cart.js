import ProductCard from "./ProductCard"
import { connect } from 'react-redux'
import { useState } from "react"
import { NavLink } from "react-router-dom"
import swal from "sweetalert"
import cartActions from "../redux/actions/cartActions"


const Cart = (props)=>{
    const [total, setTotal]=useState(0)   

    const arraySubTotales = []

    const sendSubTotal = (precioSub, idArt)=>{
        arraySubTotales.map(art=> {
            if(idArt === art.id){
                art.subtotal = precioSub
                return art
            }
            return art
        })
        
        var sumSubTotal = 0
        arraySubTotales.map(art =>{
            sumSubTotal += art.subtotal
            return null
        })
            setTotal(sumSubTotal) 
        
    }

    props.allCart.length && props.allCart.map(art=> arraySubTotales.push({id:art._id, subtotal:art.price}))

    const proceedToPayment = async()=>{
        
        if (props.userLogged && props.allCart.length) {
            const productsList= {total:total, products: props.allCart, email: props.userLogged.email}
            await props.proceedToPayment(productsList)
            props.props.push('/payment')
        }else{
            if (!props.userLogged) {
                swal("You must be logged proceed", "Want to Log in/Sign up?", "error", {
                    buttons: {
                      signup: {text: "Yes!", value: "catch"},
                      cancel: "Maybe later",
                    },
                  })
                  .then((value) => {
                    switch (value) {           
                      case "catch":
                        props.props.push('/access')
                        break         
                      default:
                    }
                  })
            }else{
                swal("You don't have any product on your cart", "Want to see our store?", "error", {
                    buttons: {
                      hardwareStore: {text: "Hardware", value: "hardwareStore"},
                      gameStore: {text: "Games", value: "gameStore"},
                      cancel: "No, Thanks",
                    },
                  })
                  .then((value) => {
                    switch (value) {         
                      case "gameStore":
                        props.props.push('/games');              
                        break      
                      case "hardwareStore":
                        props.props.push('/hardware')
                        break         
                      default:
                    }
                  })
            }
        }
    }

    
    return (
        <div className='modalCartContain'>
            <div className='modalCart'>
                <div className='divDisplayProducts'>
                    <div className='divProducts'>
                        {props.allCart.length 
                            ? props.allCart.map((articulo, i) => {
                                return <ProductCard key={i} articulo={articulo} sendSubTotal={sendSubTotal} />
                            })
                            :<div className='divSinArtCart'>
                                <h1>You don't have any product on your cart!</h1>
                                <NavLink to='/games'><p className='botonStoreCart'>Go to Game Store!</p></NavLink>
                                <NavLink to='/hardware'><p className='botonStoreCart'>Go to Hardware Store!</p></NavLink>
                            </div>}
                    </div>
                    <div className='buttonsCart'>
                        <p className='buttonCloseModalCancel' onClick={props.openCloseModal}>Keep looking</p>
                        <p className='buttonCloseModalBuy' onClick={proceedToPayment}>Finish buy</p>
                        <div className='totalPriceCart'>
                            <p>TOTAL: </p>
                            <p>${total.toFixed(0)}</p>
                        </div>
                    </div>
                </div>
                <div className='logoCart'>
                    <div className='gifLogoCart' style={{backgroundImage:'url("../assets/logoGif.gif")'}}>                 </div>
                </div>
                <p className='closeModalCart' onClick={props.openCloseModal}>X</p>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        allCart: state.cartReducer.allCart,
        userLogged:state.userReducer.userLogged
    }
}

const mapDispatchToProps = {
    proceedToPayment: cartActions.proceedToPayment
}

export default connect (mapStateToProps  , mapDispatchToProps)(Cart)