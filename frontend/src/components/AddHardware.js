import React from "react"
import swal from "sweetalert"
import { connect } from "react-redux"
import ProductActions from "../redux/actions/ProductActions";




class AddHardware extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    token= localStorage.getItem('token')

    state={
        aditionals:false,
        aditionalGame:'',
        aditionalProduct:'',
        infoHardware:{
            productName:'',
            price:'',
            brand:'',
            description:'',
            aditionalGame:[],
            aditionalProduct:[],
            features:'',
            stock:'',
            imageBanner:'',
            imagesBackground:'',
        }
    }
    readInput = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            infoHardware:{...this.state.infoHardware,
            [field]: value}
        })
    })
    
    arrayConverter = (e) =>{
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            infoHardware:{...this.state.infoHardware,
            [field]: value.split(',' || '}')}
        })
    }

    readAditionals = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            [field]: value
        })
    })


    selectOptionAditionals = (e, value) => { 
        e.preventDefault()      
        this.setState({...this.state, aditionals: value})
    }

    confirm = (e) =>{
        e.preventDefault()
        swal({
            title: `You are about to add "${this.state.infoHardware.productName}"`,
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
    addGameId = (e) =>{
        e.preventDefault()
        this.setState({
            ...this.state,
            infoHardware:{...this.state.infoHardware,
                aditionals:{...this.state.infoHardware.aditionals,
                    aditionalGame: this.state.infoHardware.aditionalGame.push(this.state.aditionalGame)}},
        })
        this.setState({...this.state, aditionalGame:''})
    }

    addProductId = (e) =>{
        e.preventDefault()
        this.setState({
            ...this.state,
            infoHardware:{...this.state.infoHardware,
                aditionals:{...this.state.infoHardware.aditionals,
                    aditionalProduct: this.state.infoHardware.aditionalProduct.push(this.state.aditionalProduct)}},
        })
        this.setState({...this.state, aditionalProduct:''})
    }



    send = async (e) => {
        e && e.preventDefault()
        const respuesta = await this.props.addHardware(this.state.infoHardware, this.token)        
        if (respuesta.error) {
            swal(respuesta.error,'', "error")           
        } else {
            swal("Product added correctly!", '', "success")
            this.setState({infoHardware:{ productName:'', price:'', brand:'', description:'', aditionalProduct:[], aditionalGame:[], features:'', stock:'', imageBanner:'', imagesBackground:''}})
        }   
    }

    componentDidMount(){
        this.toTop()
    }

    render(){

        return(

            <form className='animate__animated animate__fadeIn formGames'>
                <h1 className='titleForm'>Add New Hardware</h1>
                <div className='divInput'> 
                    <input className='input3' type="text" placeholder="Product Name" name="productName" value={this.state.infoHardware.productName} onChange={this.readInput} />
                    <input className='input3' type="text" placeholder="Price" name="price" value={this.state.infoHardware.price} onChange={this.readInput} />
                    <input className='input3' type="text" placeholder="Brand" name="brand" value={this.state.infoHardware.brand} onChange={this.readInput} />
                </div>
                <div className='divInput'>
                    <input className='input1' type="text" placeholder="Description" name="description" value={this.state.infoHardware.description} onChange={this.readInput} />
                </div>
                <div className='divInput'> 
                    <input className='input2' type="text" placeholder="Features" name="features" value={this.state.infoHardware.features} onChange={this.arrayConverter} />
                    <input className='input2' type="text" placeholder="Stock" name="stock" value={this.state.infoHardware.stock} onChange={this.readInput} />
                </div>
                {this.state.aditionals 
                    ?<div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <div>
                            <div className='divInput'>
                                <input className='input2' type="text" placeholder="Product ID" name="aditionalProduct" value={this.state.aditionalProduct} onChange={this.readAditionals} />
                                <button className='buttonForm' style={{backgroundColor:'#089f8a', border:'none'}} onClick={this.addProductId}>Add Product ID</button>
                            </div>
                            <div className='divInput'>
                                <input className='input2' type="text" placeholder="Game ID" name="aditionalGame" value={this.state.aditionalGame} onChange={this.readAditionals} />
                                <button className='buttonForm' style={{backgroundColor:'#089f8a', border:'none'}} onClick={this.addGameId}>Add Game ID</button>
                            </div>
                        </div>
                        <button className='buttonForm' style={{backgroundColor:'#089f8a', border:'none', alignSelf:'center'}} onClick={(e, value=false )=> this.selectOptionAditionals(e, value)}>Cancel</button>
                     </div>
                    :<div className='divDLC'>
                            <label htmlFor="yes" className="radioAdminPanel">
                                <span className='spanAdminPanel' style={{color:'white'}}>Has aditional content?</span>                                
                                <input className='radioButton' type="radio" id="yes" name="aditionals" onChange={(e, value=true) => this.selectOptionAditionals(e, value)} tabIndex="1"></input>
                            </label>
                     </div>
                } 
                <div className='divInput'>                             
                    <input className='input2' type="text" placeholder="Image Banner" name="imageBanner" value={this.state.infoHardware.imageBanner} onChange={this.readInput} />
                    <input className='input2' type="text" placeholder="Images for Background (Landscape)" name="imagesBackground" value={this.state.infoHardware.imagesBackground} onChange={this.arrayConverter} />
                </div>  
                <button className='buttonForm btnSubmitAdminPanel' onClick={(e)=>this.confirm(e)}>Send</button>
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
    addHardware: ProductActions.addHardware,
}


export default connect(mapStateToProps, mapDispatchToProps)(AddHardware)