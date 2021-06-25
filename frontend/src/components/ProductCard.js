import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'

const ProductCard = (props)=>{
    
    const [cantidadAMostrar, setCantidadAMostrar] = useState(1)
    
    const deleteProductCart = ()=>{
        props.deleteToCart(props.articulo._id)
        props.sendSubTotal(0 , props.articulo._id)
    }
    useEffect(()=>{
        props.articulo.discount 
            ? props.sendSubTotal(( props.articulo.price - props.articulo.price * props.articulo.discount / 100) * cantidadAMostrar, props.articulo._id)
            : props.sendSubTotal(props.articulo.price * cantidadAMostrar, props.articulo._id)      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cantidadAMostrar])
    
    return(
        <div className='cadaDivProduct'>
            <div className='divImgPortadaProductCart'>
                <div className='imgPortadaProductCart' style={{backgroundImage:`url("${props.articulo.imageBanner}")`}}></div>
            </div>
            <div className='divInfoProductCart'>
                <p>{props.articulo.title}{props.articulo.productName}</p>
            </div>
            <div className='divCantidadesEnCarrito'>
                <div className='priceCart'>
                    <p>Unit Price:</p>
                    <p>${props.articulo.price}</p>
                </div>
                <div className='amountCart'>
                    <p>Amount:</p>
                    {cantidadAMostrar > 1 
                        ? <p className='buttonRestCart' onClick={()=>setCantidadAMostrar(cantidadAMostrar-1)} >-</p>
                        : <p className='buttonRestCartBloq'>-</p>
                    }            
                    <p>{cantidadAMostrar}</p>
                    {cantidadAMostrar > 4 
                        ? <p className='buttonSumCartBloq'>+</p>
                        : <p className='buttonSumCart' onClick={()=>setCantidadAMostrar(cantidadAMostrar+1)}>+</p>
                    }
                </div>
                <div className='divTotalCartProduct'>
                    <p>Total:</p>
                    <p>${props.articulo.discount 
                        ? (( props.articulo.price - props.articulo.price * props.articulo.discount / 100) * cantidadAMostrar).toFixed(0)
                        :props.articulo.price * cantidadAMostrar}
                    </p>
                </div>
            </div>
            <div className='deleteProductCard'>
                <p onClick={deleteProductCart}>Delete</p>
            </div>
        </div>
    )
}
const mapDispatchToProps = {
    deleteToCart: cartActions.deleteToCart
}
export default connect(null, mapDispatchToProps)(ProductCard)