import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import Footer from "../components/Footer"
import Header from '../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import userActions from "../redux/actions/userActions"

class Home extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}


    componentDidMount(){
        this.toTop()
        if (this.props.userLogged && this.props.greetings) {
            toast.success(`Welcome ${this.props.userLogged.userName}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
        }

    }

    componentWillUnmount = () => {
        this.props.backWelcome()
    }

    render() {

         
        return(
            <>
            <Header props={this.props.history}/>
            <div className='containPageHome animate__animated animate__fadeIn' style={{backgroundImage:"url(../assets/fondo.png)"}}>
                <div className='parallaxRigthHome'>
                    <div className='contentMove'>
                        <div className='alignContentMove animate__animated animate__fadeIn animate__delay-4s'>
                            <h2 className='titleContentMove '>Dive in Game-X-State </h2>
                            <p className='textContentMove'>With our environment of immersive state, your games feels different, with the best quality of downloading speed, and our social Net to chat with your friends!</p>
                            <NavLink to='/games'>
                                <div className="btnExplore">Explore
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div className='contentMove'>
                        <div className='alignContentMove'>
                            <h1 className='titleTwoContentMove'>Get Exclusive Content!</h1>
                            <div className='contentVideoMove'>
                                <div className='videoContent' style={{backgroundImage: 'url("../assets/starcraftGif.gif")'}}></div>
                                <h3 className='titleVideoMove'>StarCraft 2 - DLC Game-X!</h3>
                                <p className='descriptionVideoMove'>With your buy of $3250 or more, get the aditional Material!</p>
                                <NavLink to='/games'><p className='btnHoverPlay'>Buy now</p></NavLink>
                            </div>
                        </div>    
                    </div>
                </div>
                <div className='shadowHeader'></div>    
            </div>
            
            <div className='containPageHomeDos' style={{backgroundImage:"url(../assets/fondoDos.png)"}}>
                <div className='shadowHeaderArriba'></div>
                <div className='parallaxRigthHome'>
                    <div className='contentMoveDos'>
                        <div className='alignContentMove'>
                            <h2 className='titleContentMove'>Link your favourite content</h2>
                            <p className='textContentMove'>Now you can add games to your Wish List, to recive an advice when is included in our offers! Just click the list icon and add go check your Wish List! </p>
                            {!this.props.userLogged 
                            ?<NavLink to='/access'>
                                <div className="btnExplore">Access</div>
                            </NavLink>
                            :<NavLink to='/games'>
                                <div className="btnExplore">Try it!</div>
                            </NavLink>}
                        </div>   
                    </div>
                    <div className='contentMoveDos'>
                        <div className='alignContentMove'>
                        <h1 className='titleTwoContentMove'>Available Now!</h1>
                        <div className='contentVideoMove'>
                            <div className='videoContent' style={{backgroundImage: 'url("/assets/residentGif.gif")'}}></div>
                            <h3 className='titleVideoMove'>Resident Evil: Village</h3>
                            <p className='descriptionVideoMove'>Experience survival horror like never before in the 8th major installment in the Resident Evil franchise - Resident Evil Village. With detailed graphics, intense first-person action and masterful storytelling, the terror has never felt more realistic.</p>
                            <NavLink to='/game/60b1c6e2dddb7d5530551388'><p className='btnHoverPlay'>Buy now</p></NavLink>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='shadowBottom'></div>
            </div>  
            <div className='containHomeBottom'>
                <div className='imagenHomeBottom' style={{backgroundImage: "url('https://media.elarcadia.com/data/articles/mscvqyjf71_Xbox-series-x-vs-ps5-generacionxbox.jpg')"}}>
                    <div className='contentImgHomeBottom'>
                        <h1 className='titleContentMove'>Hardwares</h1>
                        <NavLink to='/hardware'><p className='buttonContenMove'>Explore</p></NavLink>
                        
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                />
            </>   
        )
    }
}

const mapStateToProps = state =>{
    return {
        userLogged : state.userReducer.userLogged,
        greetings: state.userReducer.greetings

    }
}
const mapDispatchToProps = {

    backWelcome: userActions.backWelcome
    
  }




export default  connect(mapStateToProps, mapDispatchToProps)(Home)
