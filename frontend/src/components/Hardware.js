import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import hardwareActions from '../redux/actions/hardwareActions';
import userActions from '../redux/actions/userActions';
import { CgPlayListRemove, CgPlayListAdd } from "react-icons/cg";
import Tooltip from '@material-ui/core/Tooltip';
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import cartActions from '../redux/actions/cartActions';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';


const Hardware = (props) => {

    const toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
    const logAlert = ()=> swal("You must be logged to do that", "Want to Log in/Sign up?", "warning", {
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
    
    const [inCart, setInCart]=useState(false)
    const [myList, setMyList] = useState({ myList: props.userLogged ? props.userLogged.favouritesList : [], fetching: false })
    const token= localStorage.getItem('token')

    useEffect(() => {
        toTop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setInCart(productInCart)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.hardware, props.allCart])

    const hardwareId = props.hardware._id
                  
    var hardwareFounded = props.userLogged && myList.myList ? myList.myList.some(hardwareAdded => hardwareAdded.productId === hardwareId): false
    var productInCart = props.hardware && props.allCart.length !== 0 ? props.allCart.some(product => product._id === props.hardware._id): false

                    
    const sendHardwareToList = async(product) =>{
        if (props.userLogged) {
            setMyList({...myList, fetching:true})
            const add = {product, add:true, game:false}
            const remove = {product, add:false, game:false}
            const sendedData = hardwareFounded ? remove : add
            const response = await props.addToMyList(sendedData, token, props.userLogged.id)
            setMyList({myList: response.favouritesList, fetching: false})
            !hardwareFounded && toast.success(`Added ${props.hardware.productName} to your list`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            hardwareFounded && toast.error(`Removed ${props.hardware.productName} from your list`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });   
        } else{
            logAlert()
        }     
      }      
    
    const addToCart = ()=>{
        setInCart(!inCart)
        props.addToCart(props.hardware)
        toast.success(`Added ${props.hardware.productName} to your cart`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
        props.setHardwareInCart(true)
    }
    const removeToCart = ()=>{
        setInCart(!inCart)
        props.deleteToCart(props.hardware._id)
        toast.error(`Removed ${props.hardware.productName} from your cart`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
        props.setHardwareInCart(true)
        
    }


    return (
        <div className='cardHardwareIndiv'>
            
            <div className='allInfoProductHardware'>
                <div className='titleProductHardware'><h2>{props.hardware.productName}</h2></div>
                <div className='descriptionProductHardware'>
                    <p className='pTituloInfoSecHard'>Description: </p>
                    <p className='pDescriptionProductHardware'>{props.hardware.description}</p>
                </div>
                <div>
                    <p className='pTituloInfoSecHard'>Features: </p>
                    {props.hardware.features.map((feature,i )=><p key={i} className='pDescriptionProductHardware'>{feature}</p>)}
                </div>
                <div className='priceProductHardware'>
                    <p className='priceHardware'>${props.hardware.price}</p>
                    {!inCart 
                        ? <Tooltip title="Add to cart" placement="top" > 
                            <div>
                                {props.hardware.stock === 0 
                                    ? <MdAddShoppingCart className='addToWishListOnComponentBloq'/>
                                    :<MdAddShoppingCart  onClick={addToCart} className='addToWishListOnComponent'/>}
                            </div>
                        </Tooltip>
                        :<Tooltip title="Remove from cart" placement="top" >
                            <div>
                                <MdRemoveShoppingCart  onClick={removeToCart} className='removeFromWishListOnComponent'/>
                            </div>
                        </Tooltip>}
                    {!hardwareFounded 
                        ? <Tooltip title="Add to Wishlist" placement="top" > 
                            <div>
                                <CgPlayListAdd  onClick={()=> !myList.fetching ? sendHardwareToList(hardwareId): null} className='addToWishListOnComponent'/>
                            </div>
                        </Tooltip>
                        : <Tooltip title="Remove from Wishlist" placement="top" >
                            <div>
                                <CgPlayListRemove  onClick={()=> !myList.fetching ? sendHardwareToList(hardwareId): null} className='removeFromWishListOnComponent'/>
                            </div>
                        </Tooltip>
                    }
                    
                </div>
            </div>
            <div className='imgButtonProductHardware'>
                
                <div className='imgProductHardwareCard' style={{backgroundImage:`url('${props.hardware.imageBanner}')`}}>
                    {props.hardware.stock === 0 && <div className='divTarjetaSinStock'><p>OUT OF STOCK</p></div>}
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                />
        </div>
             
    )
}
const mapStateToProps = (state) => {
    return {
        userLogged: state.userReducer.userLogged,
        allCart: state.cartReducer.allCart
    }
}
const mapDispatchToProps = {
    addToMyList :  userActions.addToMyList,
    addToCart: cartActions.addToCart,
    deleteToCart: cartActions.deleteToCart,
    setHardwareInCart: hardwareActions.setHardwareInCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Hardware)