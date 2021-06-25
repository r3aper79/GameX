import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import swal from 'sweetalert'
import userActions from '../redux/actions/userActions'
// import Chat from './Chat'
import SimplePopover from "./Popover";
import { FaShoppingCart } from "react-icons/fa";
import Cart from './Cart'
import hardwareActions from '../redux/actions/hardwareActions'



const Header = (props) =>{ 

    
    // const [openChat, setOpenChat] = useState(false)
    const [favouritesList, setFavouriteslist] = useState([])
    const [cart, setCart] = useState([])
    const visibility = props.open ? "visible" : "hidden"

    const logOut=(()=> {
        swal({
            title: "Are you sure that you want to Log Out?",
            text: "You can Log in again, anyway",
            icon: "warning",
            buttons: ["No Way!", "I'm Sure!"],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                props.removeUserInfo()
            } 
        });
    })


    useEffect(()=>{
        if(props.userLogged && props.favouritesList.length){
            const fetchProducts = async()=>{
                const list = await props.getProductsOnList(props.userLogged.id)
                list !== favouritesList &&
                setFavouriteslist(list)
            } 
            fetchProducts()
        }else{
            setFavouriteslist([])
        }
        setCart(props.allCart)
    // eslint-disable-next-line
    },[props.favouritesList,props.allCart])

    
    let image = ""
    
    if ( props.userLogged  && props.userLogged.imageUrl) {
        image = props.userLogged.imageUrl
    } else if ( props.userLogged && !props.userLogged.imageUrl && props.userLogged.avatar) {
        image = props.userLogged.avatar      
    } else {
        image = "/assets/generic-user-icon.jpg"
    }
    const [reloaded, setReloaded]=useState(false)

    useEffect(()=>{
        setReloaded(!reloaded)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.inCart])
    
    useEffect(()=>{
        setReloaded(!reloaded)
        props.setHardwareInCart(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ props.hardwareInCart])

    const [displayModal, setDisplayModal] = useState(false)
    const openCloseModal = ()=>{
        setDisplayModal(!displayModal)
    }
    var modal = {
        display : displayModal ? 'flex' : 'none',
    }


    
    return(
        <>
            <div className='containHeader animate__animated animate__fadeIn animate__delay-1s'>
                <NavLink to='/'>
                    <div className='logoHeader'>
                        <div className='gifLogo animate__animated animate__fadeInLeft animate__delay-1s' style={{backgroundImage:'url("../assets/logoGif.gif")'}}></div>
                        <h1 className='nameLogoHeader animate__animated animate__fadeIn animate__delay-3s'>Game-X</h1>
                    </div>
                </NavLink>
                <div className='animate__animated animate__fadeIn animate__delay-1s'style={{display:'flex', flexDirection:'row'}}>
                    <div className='navbarMenu '>
                            <div className="navigation" style={{marginRight:'100px'}}>
                                <input type="checkbox"/>
                                <span></span>
                                <span></span>
                                <div className={`${!props.userLogged ? "menuNavLargo" : props.userLogged.rol === 'admin' ? "menuNavLargo" : "menuNav"}`} >
                                    <NavLink to='/'><li>Home</li></NavLink>
                                    <NavLink to='/games' name='games'><li>Games</li></NavLink>
                                    <NavLink to='/hardware'><li>Hardware</li></NavLink>
                                    {props.userLogged && props.userLogged.rol === "admin" && <NavLink to='/admin'><li >Adm Panel</li></NavLink>}
                                    {!props.userLogged && <NavLink to='/access' name='access'><li>Access</li></NavLink>}
                                    <li className='cartHeader' onClick={openCloseModal}><FaShoppingCart className='iconHeaderCart'/>{cart.length}</li>
                                </div>
                            </div>
                    </div>
                    <div className='profileBody animate__animated animate__fadeIn animate__delay-2s'>
                            <div className="nav">
                                <input type="checkbox"/>
                                <div style={{backgroundImage: `url("${image}")`}} className="avatarHeader" />
                                {props.userLogged &&
                                <div className="menu">
                                    <SimplePopover favouritesList={favouritesList} props={props.props}/>
                                    <NavLink to='/mybuys'><li>My Buys</li></NavLink>
                                    {/* <li onClick={()=> setOpenChat(!openChat)}>Chat</li> */}
                                    <li onClick={()=> swal("The chat will be available soon")}>Chat</li>
                                    <li onClick={(e)=>logOut(e.target)}>LogOut</li>
                                </div>}
                            </div>
                    </div>
                </div>
                <div className="popOverBody" style={{visibility: visibility}}>        
                    <div className="con-tooltip left">
                        <p> Left </p>
                        <div className="tooltip ">
                            <p>Left</p>
                        </div>

                    </div>
                </div>
               {/* {props.userLogged && <Chat open = {openChat}/>} */}
            </div>  
            <div style={modal}>
                <Cart openCloseModal={openCloseModal} props={props.props}/> 
            </div>  
        </>   
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged,
        favouritesList: state.userReducer.favouritesList,
        allCart: state.cartReducer.allCart,
        hardwareInCart: state.hardwareReducer.hardwareInCart
    }
  }
  const mapDispatchToProps = {
    removeUserInfo :  userActions.removeUserInfo,
    getProductsOnList: userActions.getProductsOnList,
    setHardwareInCart: hardwareActions.setHardwareInCart
  
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Header)