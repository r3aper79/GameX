
import React from "react"
import swal from "sweetalert"
import { connect } from "react-redux"
import ProductActions from "../redux/actions/ProductActions";



class AddGame extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    token= localStorage.getItem('token')

    state={
        gotDLC:false,
        DLCInfo:{
            name:"",
            price:"",
            description:"",
            imageBanner:'',
        },
        infoGame:{
            title:'',
            year:'',
            genre:'',
            language:'',
            developer:'',
            online:'',
            platform:'',
            price:'',
            description:'',
            discount:'',
            DLC:[],
            imageBanner:'',
            imagesBackground:'',
            PEGI:'',
        }
    }
    readInput = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            infoGame:{...this.state.infoGame,
            [field]: value}
        })
    })

    selectOptionDLCs = (e, value) => { 
        e.preventDefault()      
        this.setState({...this.state, aditionals: value})
    }

    arrayConverter = (e) =>{
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            infoGame:{...this.state.infoGame,
            [field]: value.split(',')}
        })
    }

    objectConverter = (e) =>{
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
                DLCInfo:{...this.state.DLCInfo,
                [field]: value}
        })
    }

    confirm = (e) =>{
        e.preventDefault()
        swal({
            title: `You are about to add "${this.state.infoGame.title}"`,
            text: "Is that ok?",
            icon: "info",
            buttons: true,
            dangerMode: true,
          })
          .then((ok) => {
            if (ok) {
              this.send()
            } 
          });
    } 
    addDLC = (e) =>{
        e.preventDefault()
        this.setState({
            ...this.state,
            infoGame:{...this.state.infoGame,
                DLCInfo:{...this.state.infoGame.DLCInfo,
                    DLC: this.state.infoGame.DLC.push(this.state.DLCInfo)}},
        })
        this.setState({...this.state, DLCInfo:{name:"", price:"", description:"", imageBanner:''},})
    }

    send = async (e) => {
        e && e.preventDefault()
        const respuesta = await this.props.addGame(this.state.infoGame, this.token)
        if (respuesta.error) {
            swal(respuesta.error,'', "error")           
        } else {
            swal("Game added correctly!", '', "success")
            this.setState({infoGame:{title:'', year:'', genre:'', language:'', developer:'', online:'', platform:'', price:'', description:'', DLC:[], discount:'', imageBanner:'', imagesBackground:'', PEGI:'', }})
        }   
    }

    componentDidMount(){
        this.toTop()
    }

    render(){
        return(
            <form className='animate__animated animate__fadeIn formGames'>
                <h1 className='titleForm'>Add New Game</h1>
                <div className='divInput'>
                    <input className='input3' type="text" placeholder="Title" name="title" value={this.state.infoGame.title} onChange={this.readInput} />
                    <input className='input3' type="text" placeholder="Year" name="year" value={this.state.infoGame.year} onChange={this.readInput} />
                    <input className='input3' type="text" placeholder="PEGI" name="PEGI" value={this.state.infoGame.PEGI} onChange={this.readInput} />
                </div>
                <div className='divInput'>
                    <input className='input2' type="text" placeholder="Genre" name="genre" value={this.state.infoGame.genre} onChange={this.arrayConverter} />
                    <input className='input2' type="text" placeholder="Language" name="language" value={this.state.infoGame.language} onChange={this.arrayConverter} />
                </div>
                <div className='divInput'>
                    <input className='input2' type="text" placeholder="Developer" name="developer" value={this.state.infoGame.developer} onChange={this.readInput} />
                    <div className='input2'>
                        <span  className='spanAdminPanel'>is Online?</span>  
                        <label htmlFor="yes" className="radioButton">
                                        <span className='spanAdminPanel'>Yes</span>                                
                                        <input className='radioOnline' type="radio" id="yes" name="online" value={true} onChange={this.readInput} tabIndex="1"></input>
                        </label>
                        <label htmlFor="no" className="radioButton">
                                        <span className='spanAdminPanel'>No</span>                                
                                        <input className='radioOnline' type="radio" id="no" name="online" value={false} onChange={this.readInput} tabIndex="2"></input>
                        </label>
                    </div>
                </div>
                <div className='divInput'>
                    <input className='input2' type="text" placeholder="Platform" name="platform" value={this.state.infoGame.platform} onChange={this.arrayConverter} />
                    <input className='input2' type="text" placeholder="Price" name="price" value={this.state.infoGame.price} onChange={this.readInput} />
                </div>
                <div className='divInput'>
                    <input className='input2' type="text" placeholder="Description" name="description" value={this.state.infoGame.description} onChange={this.readInput} />
                    <input className='input2' type="text" placeholder="Discount" name="discount" value={this.state.infoGame.discount} onChange={this.readInput} />
                </div>
                {this.state.aditionals 
                    ?<div>
                        <div>
                            <h3 className='titleForm'>DLC's info:</h3>
                            <div className='divInput'>
                                <input className='input2' type="text" placeholder="Name" name="name" value={this.state.DLCInfo.name} onChange={this.objectConverter} />
                                <input className='input2' type="text" placeholder="Price" name="price" value={this.state.DLCInfo.price} onChange={this.objectConverter} />
                            </div>
                            <div className='divInput'>
                                <input className='input2' type="text" placeholder="Description" name="description" value={this.state.DLCInfo.description} onChange={this.objectConverter} />
                                <input className='input2' type="text" placeholder="Image URL (landscape) " name="imageBanner" value={this.state.DLCInfo.imageBanner} onChange={this.objectConverter} />
                            </div>
                        </div>
                        <div className='divButtons'>
                            <button className='buttonForm' style={{backgroundColor:'#089f8a', border:'none'}} onClick={(e, value=false )=> this.selectOptionDLCs(e, value)}>Cancel</button>
                            <button className='buttonForm' style={{backgroundColor:'#089f8a', border:'none'}} onClick={this.addDLC}>Add DLC</button>
                        </div>
                     </div>
                    :<div className='divDLC'>
                            <label className='radioAdminPanel' htmlFor="yess" >
                                <span  className='spanAdminPanel' style={{color:'white'}}>Has available DLC's?</span>                                
                                <input className='radioButton' type="radio" id="yess" name="aditionals" onChange={(e, value=true) => this.selectOptionDLCs(e, value)} tabIndex="1"></input>
                            </label>
                     </div>
                }
                <div className='divInput'>
                    <input className='input1' type="text" placeholder="Image Banner" name="imageBanner" value={this.state.infoGame.imageBanner} onChange={this.readInput} />
                </div>
                <div className='divInput'>
                    <input className='input1' type="text" placeholder="Images for Background (Landscape)" name="imagesBackground" value={this.state.infoGame.imagesBackground} onChange={this.arrayConverter} />                
                </div>
                <button className='buttonForm btnSubmitAdminPanel'onClick={(e)=>this.confirm(e)}>Send</button>
            </form>       
        )
    }
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged
    }
}
const mapDispatchToProps = {
    addGame: ProductActions.addGame,
}


export default connect(mapStateToProps, mapDispatchToProps)(AddGame)