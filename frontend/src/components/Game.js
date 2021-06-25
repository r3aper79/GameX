import { useEffect, useState } from 'react';
import Header from './Header'
import { connect } from 'react-redux';
import hardwareActions from '../redux/actions/hardwareActions';
import gamesActions from '../redux/actions/gamesActions';
import Loader from '../components/Loader';
import userActions from '../redux/actions/userActions';
import { CgPlayListRemove, CgPlayListAdd } from "react-icons/cg";
import Tooltip from '@material-ui/core/Tooltip';
import cartActions from '../redux/actions/cartActions';
import swal from 'sweetalert';
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';


const Game = (props) => {
    
    
    const toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    const [inCart, setInCart]=useState(false)
    const [gameDetails, setGameDetails] = useState(null)
    const [myList, setMyList] = useState({ myList: props.favouritesList ? props.favouritesList : [], fetching: false })


    const logAlert = ()=> swal("You must be logged to do that", "Want to Log in/Sign up?", "warning", {
        buttons: {
          signup: {text: "Yes!", value: "catch"},
          cancel: "Maybe later",
        },
      })
      .then((value) => {
        switch (value) {           
          case "catch":
            props.history.push('/access')
            break         
          default:
        }
      })

    useEffect(() => {
        toTop()
        if (props.allGames.length === 0) {
            props.history.push('/games')
        }
            let idGame = props.match.params.id
            let gameFilter = props.allGames.find(game => game._id === idGame)
            setGameDetails({
               ...gameFilter
            })
        
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.params.id])
    useEffect(() => {
        setInCart(productInCart)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.allGames, props.allCart, props.match.params.id])

    const token= localStorage.getItem('token')

    const idGame = props.match.params.id
  
    var gameFounded = myList.myList.length ? myList.myList.some(gameAdded => gameAdded.gameId === idGame): false
    var productInCart = gameDetails && props.allCart.length !== 0 ? props.allCart.some(product => product._id === gameDetails._id): false
    
    const sendGameToList = async(product) =>{
        if (props.userLogged) {
            setMyList({...myList, fetching:true})
            const add = {product, add:true, game:true}
            const remove = {product, add:false, game:true}
            const sendedData = gameFounded ? remove : add
            const response = await props.addToMyList(sendedData, token, props.userLogged.id)
              setMyList({myList: response.favouritesList, fetching: false})
                !gameFounded && toast.success(`Added ${gameDetails.title} to your list`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    });
                gameFounded && toast.error(`Removed ${gameDetails.title} from your list`, {
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
        props.addToCart(gameDetails)
        toast.success(`Added ${gameDetails.title} to your cart`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
    }
    const removeToCart = ()=>{
        setInCart(!inCart)
        props.deleteToCart(gameDetails._id)
        toast.error(`Removed ${gameDetails.title} from your cart`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
    }
    return (
        <>
            {!gameDetails
                ? <Loader />
                : (
                    <>
                        <Header props={props.history} inCart={inCart}/>
                        <div className='containGameComp'>
                            <div className='containBoxGame'>
                                <div className='imgBanerBkGame' style={{ backgroundImage: `url('${gameDetails.imagesBackground[1]}')` }}></div>
                                <div className='imgPortadaBkGame' style={{ backgroundImage: `url('${gameDetails.imageBanner}')` }}></div>
                                <div className='infoFastGame'>
                                    <div className='titleAndYear'>
                                        <h2 className='titleGameCard'>{gameDetails.title}</h2>
                                        <p className='yearGameCard'>({gameDetails.year})</p>
                                    </div>
                                    <div className='divTagsGame'>
                                        <p className='pTituloInfoSec'>Categories: </p>
                                        {gameDetails.genre.map((genero, i) => {
                                            return <p key={i} className='tag'>{genero}</p>
                                        })}
                                    </div>
                                    <div className='descriptionPrice'>
                                        <div className='divDescriptionGameCard'>
                                            <p className='pTituloInfoSec'>Description:</p>
                                            <p className='pDescriptionContent'>{gameDetails.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='divAddCart'>
                                        {gameDetails.discount ? <div className='borderPriceDiscount'>
                                                <p className='priceGameSinDiscount'>${gameDetails.price}</p>
                                                <p className='priceGameConDiscount'>${(-gameDetails.price * gameDetails.discount /100 +gameDetails.price).toFixed(0)}</p>
                                            </div>
                                            :<p className='priceGame'>${gameDetails.price}</p>}  
                                    {!inCart
                                    ?<Tooltip title="Add to cart" placement="top" > 
                                        <div>
                                            <MdAddShoppingCart  onClick={addToCart} className='addToWishListOnComponent'/>
                                        </div>
                                    </Tooltip>
                                    :<Tooltip title="Remove from cart" placement="top" >
                                        <div>
                                            <MdRemoveShoppingCart  onClick={removeToCart} className='removeFromWishListOnComponent'/>
                                        </div>
                                    </Tooltip>}
                                    {!gameFounded 
                                    ? <Tooltip title="Add to Wishlist" placement="top" > 
                                        <div>
                                            <CgPlayListAdd  onClick={()=> !myList.fetching ? sendGameToList(idGame): null} className='addToWishListOnComponent'/>
                                        </div>
                                    </Tooltip>
                                    : <Tooltip title="Remove from Wishlist" placement="top" >
                                        <div>
                                            <CgPlayListRemove  onClick={()=> !myList.fetching ? sendGameToList(idGame): null} className='removeFromWishListOnComponent'/>
                                        </div>
                                    </Tooltip>
                                    }                                        
                                </div>
                                
                                <div className='divInfoSecondCardGame'>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Plataform:</p>
                                        {gameDetails.platform.map((plataform, i) => {
                                            return <p key={i} className='tagPlataform'>{plataform}</p>
                                        })}
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Pegi:</p>
                                        <p className='pRecicladoTextInfo'>{gameDetails.PEGI}</p>
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Developer:</p>
                                        <p className='pRecicladoTextInfo'>{gameDetails.developer}</p>
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Language:</p>
                                        {gameDetails.language.map((lenguaje,i) => {
                                            return <p className='pRecicladoTextInfo' key={i}>{lenguaje}</p>
                                        })}
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Multiplayer:</p>
                                        {gameDetails.online ? <p className='pRecicladoTextInfo'>Yes</p> : <p className='pRecicladoTextInfo'>No</p>}
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Online:</p>
                                        <p className='pRecicladoTextInfo'>{gameDetails.online ? 'Yes': 'No'}</p>
                                    </div>
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
                    </>
                )
            }
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        allHardwares: state.hardwareReducer.allHardwares,
        preLoader: state.hardwareReducer.preLoader,
        allGames: state.gamesReducer.allGames,
        preLoaderGames: state.gamesReducer.preLoader,
        userLogged: state.userReducer.userLogged,
        allCart: state.cartReducer.allCart,
        favouritesList: state.userReducer.favouritesList
    }
}
const mapDispatchToProps = {
    loadHardwares: hardwareActions.loadHardwares,
    loadGames: gamesActions.loadGames,
    addToMyList :  userActions.addToMyList,
    addToCart: cartActions.addToCart,
    deleteToCart: cartActions.deleteToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)