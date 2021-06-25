import React from "react"
import userActions from "../redux/actions/userActions";
import { connect } from "react-redux"
import swal from 'sweetalert'
import GoogleLogin from 'react-google-login';
import axios from "axios";
import Header from "../components/Header";
import { AiFillPicture } from 'react-icons/ai'


class Access extends React.Component{
    toTop= () => {window.scroll({
        top:0, 
        left:0,
        behavior:"smooth"
    })}

    state={
        countries:[],
        userInfoSignUp:{
            userName: "",
            country: "",
            password:"",
            avatar: "",
            email: "",
        },
        validator:{
            userName: "",
            country: "",
            password:"",
            avatar: "",
            email: "",
        },
        userInfoLogIn:{
            password:"",
            userName: "",
        },
        buttonChange: 'container',
        file:''
    }

    changeForm = (e)=>{
        let id = e.target.id
        id === 'signUp' && this.setState({...this.state, buttonChange:"container right-panel-active"})
        id === 'logIn' && this.setState({...this.state, buttonChange: "container"})
    }

    
    loadImage = e => {
        this.setState({
            ...this.state,
            file: URL.createObjectURL(e.target.files[0]),
            userInfoSignUp:{...this.state.userInfoSignUp,
            avatar: e.target.files[0]}
        })        
    }

    readInputSignUp = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            userInfoSignUp:{...this.state.userInfoSignUp,
            [field]: value}
        })
    })
    readInputLogIn = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            userInfoLogIn:{...this.state.userInfoLogIn,
            [field]: value}
        })
    })


    sendNewAccount = async (e = null, googleUser = null) => {
       e && e.preventDefault()
       const formData = new FormData()
       formData.append('userName', this.state.userInfoSignUp.userName)
       formData.append('avatar', this.state.userInfoSignUp.avatar) 
       formData.append('country', this.state.userInfoSignUp.country)
       formData.append('email', this.state.userInfoSignUp.email)
       formData.append('password', this.state.userInfoSignUp.password)
       let userInfo= e ? formData : googleUser
            const respuesta = await this.props.newUser(userInfo)
                if (!respuesta) {
                    return this.props.history.push('/serverdown') 
                }else if (respuesta.message) {
                    swal(respuesta.message,"", "error")                
                } else {
                    switch(respuesta){
                        case 'The E-mail is already in use':
                            swal("The E-mail is already in use", "Try another one!", "error")
                            break
                        case 'There was an error in the register.':
                            swal("There was an error in the register.", "Please verify all the required fields are completed.", "error")
                            break
                        default:
                            // return swal("Signed Up!", respuesta, "success")
                    }
                }                     
    }  
    sendLogIn = async (e = null, googleUser = null) => {
        e && e.preventDefault()
        let userInfo= e ? this.state.userInfoLogIn : googleUser
        const respuesta = await this.props.logUser(userInfo)
        if (!respuesta) {
            return this.props.history.push('/serverdown')            
        } else if (respuesta.error) {
            swal(respuesta.error, "Verify and try again!", "error")
        } else {
            // swal("Loged in correctly!", respuesta, "success")
        }   
    }

    validate = (e) => {
        const field = e.name
        var message = null
        var expression;
        var invalid = "is-invalid"
        var valid = " is-valid"
        if (e.value.length !== 0) {
            switch(field){
                case 'userName' :
                    expression= ('^(?=.{2,40}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@-]+(?<![_.])$')
                    message= !e.value.match(expression) 
                    break
                case 'email':
                    expression= (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/)
                    message= !e.value.match(expression)   
                    break
                case 'password':
                    expression= /(?=.*\d)(?=.*[A-z])/
                    message = e.value.length < 6 || !e.value.match(expression)
                    break
                case 'avatar':
                    message= e.value.length === 0 || e.value.length <=3
                    break  
                default:
                    return null
            }
        }        
        this.setState({
            ...this.state,
            validator:{...this.state.validator,
                [field]:  message === null ? "" : !message ? valid : invalid}
        })
    }
    
    componentDidMount(){  
        this.toTop()
        axios.get(`https://restcountries.eu/rest/v2/all`)
        .then(response => this.setState({...this.state, countries: response.data}))
        .catch(error => this.props.history.push('/serverdown'))      
    }    
    responseGoogleSignUp = (response) => {
        if (response.error) {
            swal("The Google popup was closed too early!", "Try again!", "error")
        } else{
        const {email, googleId, imageUrl } = response.profileObj
        this.sendNewAccount(null, {userName: email, email: email, password: "matias"+googleId, imageUrl: imageUrl, country: "null", avatar:imageUrl})
        }
    }
    responseGoogleLogIn = (response) => {
        if (response.error) {
            swal("The Google popup was closed too early!", "Try again!", "error")
        } else{
        const {email, googleId} = response.profileObj
        this.sendLogIn(null,{userName: email, password: "matias"+googleId, country: "null"})
        }
    }

    
    render() {

        return(<>
                <Header  />
                <div className='body' style={{backgroundImage:"url(../assets/fondo.png)"}}>   
                     <div className={`animate__animated animate__fadeInRight animate__delay-1s ${this.state.buttonChange}`}  id="container">
                        <div className="form-container sign-up-container">
                            <form className="registerForm" action="#">
                                <h1>Create Account</h1>
                                <div className="social-container">
                                    <GoogleLogin
                                        // clientId="768453080794-ldth5cg2rmpvlb0k55f08gdigaba5nj0.apps.googleusercontent.com"
                                        clientId="768453080794-vgr6sjtlb1ojjitqheqfvi6nv985jval.apps.googleusercontent.com"
                                        render={renderProps => (
                                            <button className="social buttonFormSignUp" onClick={renderProps.onClick} disabled={renderProps.disabled}><svg className='svgGoogle' width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>Google Account</button>
                                        )}
                                        onSuccess={this.responseGoogleSignUp}
                                        onFailure={this.responseGoogleSignUp}
                                        cookiePolicy={'single_host_origin'}
                                        />
                                </div>
                                <span className='span'>or use your email for registration</span>
                                <input className={`registerInput ${this.state.validator.userName}`} onBlur={(e) => this.validate(e.target)} type="text" placeholder="Choose your Username" name="userName" value={this.state.userInfoSignUp.userName} onChange={this.readInputSignUp} />
                                <input className={`registerInput ${this.state.validator.email}`} onBlur={(e) => this.validate(e.target)} type="text" placeholder="E-Mail" name="email" value={this.state.userInfoSignUp.email} onChange={this.readInputSignUp} />
                                <input id="password" autoComplete="off" className={`registerInput ${this.state.validator.password}`} onBlur={(e) => this.validate(e.target)} type="password" placeholder="Password" name="password" value={this.state.userInfoSignUp.password} onChange={this.readInputSignUp}  />
                                <div className="fileinputs">
                                    <input className={`registerInput file ${this.state.validator.avatar}`} onBlur={(e) => this.validate(e.target)} type="file" name="avatar" id="avatar"  onChange={this.loadImage} ></input>
                                    <div className="fakefile">
                                        <div className='renderAvatar' style={this.state.userInfoSignUp.avatar === '' ?{backgroundImage: `url("/assets/generic-user-icon.jpg")`} :{backgroundImage:`url(${this.state.file})`} }/>   
                                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                            <div></div>
                                            <p>{this.state.userInfoSignUp.avatar === '' ? 'Select Avatar' : `${this.state.userInfoSignUp.avatar.name.slice(0,18)}...` }</p>
                                            {this.state.userInfoSignUp.avatar === '' ? <AiFillPicture className='iconoSelectImg'/>: null}
                                        </div>
                                    </div>
                                </div>                                
                                <select className={`registerInput ${this.state.validator.country}`} onClickCapture={(e) => this.validate(e.target)} type="select" placeholder="Country" name="country" value={this.state.userInfoSignUp.country} onChange={this.readInputSignUp}>
                                        <option disabled value="">Choose your Country</option>
                                            {this.state.countries.length && 
                                            this.state.countries.map((country, index) =>{
                                                return <option key={index}>{country.name}</option>
                                            })}
                                </select>  
                                <button className="buttonFormSignUp" onClick={(e)=>this.sendNewAccount(e)}>Sign Up</button>
                            </form>
                        </div>
                        <div className="form-container sign-in-container">
                            <form className="registerForm"action="#">
                                <h1>Log In</h1>
                                <div className="social-container">
                                    <GoogleLogin
                                        // clientId="768453080794-ldthgi5cg2rmpvlb0k55f08gdigaba5nj0.apps.googleusercontent.com"
                                        clientId="768453080794-vgr6sjtlb1ojjitqheqfvi6nv985jval.apps.googleusercontent.com"
                                        
                                        render={renderProps => (
                                            <button className="social buttonForm" onClick={renderProps.onClick} disabled={renderProps.disabled}><svg className='svgGoogle' width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>Google Account</button>
                                        )}
                                        onSuccess={this.responseGoogleLogIn}
                                        onFailure={this.responseGoogleLogIn}
                                        cookiePolicy={'single_host_origin'}
                                        />
                                </div>
                                <span className='span'>or use your account</span>
                                <input className="registerInput" type="text" placeholder="Username" name="userName" value={this.state.userInfoLogIn.userName} onChange={this.readInputLogIn} />
                                <input className="registerInput" autoComplete="off" type="password" placeholder="Password" name="password" value={this.state.userInfoLogIn.password} onChange={this.readInputLogIn} />
                                <button className="buttonForm" onClick={this.sendLogIn}>Log In</button>
                            </form>
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your account info</p>
                                    <button style={{color:'#ADE7E3'}} className="ghost buttonForm" id="logIn" onClick={(e)=> this.changeForm(e)}>Log In</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Define your personal details and start journey with us</p>
                                    <button style={{color:'#ADE7E3'}}className="ghost buttonForm" id="signUp" onClick={(e)=> this.changeForm(e)}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
                </>  
        )
    }
}
const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged
    }
}
const mapDispatchToProps = {
    newUser: userActions.newUser,
    logUser: userActions.logUser
}


export default connect(mapStateToProps, mapDispatchToProps)(Access)