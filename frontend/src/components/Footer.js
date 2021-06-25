import {Link} from 'react-router-dom'
import { connect } from 'react-redux'


const Footer = (props) =>{ 
    return(
        <div className='containFooter'>
            <hr className='hrFooter'></hr>
            <div className='containNavFooter'>
                <div className='divContainNavFooter'>
                    <h2 className='nameLogoFooter'>Game-X</h2>
                    <p className='pContainNavFooter'>Game-X the first virtual videoGames Company</p>
                    <p className='pContainNavFooter'>You can find a lot of games here!</p>
                    <p className='pContainNavFooter'>If you are a gamer, you know our pages!</p>
                    <p className='pContainNavFooter'>Be a gamer, be a member of our family</p>
                </div>
                <div className='divContainNavFooter'>
                    <h3 className='titleSeccionFooter'>Contact</h3>
                    <p className='pContainNavFooter'>500 Terry Francois Street </p>
                    <p className='pContainNavFooter'>San Francisco, CA 94158</p>
                    <p className='pContainNavFooter'>GameX.arg@gmail.com</p>
                    <p className='pContainNavFooter'>Tel: 123-456-7890</p>
                </div>
                <div className='divContainNavFooter'>
                    <h3 className='titleSeccionFooter'>Quick Menu</h3>
                    <Link to="/" className='pContainNavFooter'>Home</Link>
                    <Link to="/games" className='pContainNavFooter'>Game Store</Link>
                    <Link to="/hardware" className='pContainNavFooter'>Hardware Store</Link>
                    {props.userLogged && props.userLogged.rol === "admin" && <Link to="/admin" className='pContainNavFooter'>Adm Panel</Link>}
                </div>
                <div className='divContainNavFooter'>
                    <h3 className='titleSeccionFooter'>Socials</h3>
                   <a  href="http://facebook.com" className='pContainNavFooter'>Facebook</a>
                   <a  href="http://instagram.com" className='pContainNavFooter'>Instagram</a>
                   <a  href="http://twitter.com" className='pContainNavFooter'>Twitter</a>
                   <a  href="http://youtube.com" className='pContainNavFooter'>Youtube</a>
                </div>
            </div>
        </div>       
    )
}

const mapStateToProps = state =>{
    return {
        userLogged: state.userReducer.userLogged
    }
}

export default connect(mapStateToProps , null) (Footer)