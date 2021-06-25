import { NavLink } from 'react-router-dom'
import { CgPlayListRemove, CgPlayListAdd } from "react-icons/cg";
import { connect } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import swal from 'sweetalert';
import { toast } from 'react-toastify';


const CardProduct = (props) => {
    const { image, title, idGame } = props

    const [myList, setMyList] = useState({ myList: props.userLogged ? props.userLogged.favouritesList : [], fetching: false })

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


    const token= localStorage.getItem('token')
  
    var gameFounded = props.userLogged && myList.myList ? myList.myList.some(gameAdded => gameAdded.gameId === idGame): false
    
    const sendGameToList = async(product) =>{
      if (props.userLogged) {
        setMyList({...myList, fetching:true})
        const add = {product, add:true, game:true}
        const remove = {product, add:false, game:true}
        const sendedData = gameFounded ? remove : add
        const response = await props.addToMyList(sendedData, token, props.userLogged.id)
          setMyList({myList: response.favouritesList, fetching: false}) 
        !gameFounded && toast.success(`Added ${title} to your list`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
        gameFounded && toast.error(`Removed ${title} from your list`, {
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
        

    return (
            <>
                {!gameFounded 
                ? <Tooltip title="Add to Wishlist" placement="top-end" className='tooltipWishlist'> 
                    <div>
                      <CgPlayListAdd  onClick={()=> !myList.fetching ? sendGameToList(idGame): null} className='addToWishlist'/>
                    </div>
                  </Tooltip>
                : <Tooltip title="Remove from Wishlist" placement="top-end" className='tooltipWishlist'>
                    <div>
                      <CgPlayListRemove  onClick={()=> !myList.fetching ? sendGameToList(idGame): null} className='removeFromWishList'/>
                    </div>
                  </Tooltip>
                }
                {<NavLink to={`/game/${idGame}`}>
                        <figure className="card contentRibbon">
                            {props.discount ? <div className="ribbon"><span>OFFER</span></div> : null}
                            <div className="cardImageProduct" style={{backgroundImage: `url("${image}")`}}></div>
                            <figcaption>{title.toUpperCase()}</figcaption>
                        </figure>
                </ NavLink>}       
            </>
    );
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged
    }
  }
  const mapDispatchToProps = {
    addToMyList :  userActions.addToMyList,
  
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(CardProduct)