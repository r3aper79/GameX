import { useState }  from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import buyActions from '../redux/actions/buyActions'
import CreditCard from '../components/CreditCard'
import Paypal from "../components/Paypal"
import { NavLink } from 'react-router-dom'
import SuccessfullyBuy1 from '../components/SuccessfullyBuy1'
import SuccessfullyBuy2 from '../components/SuccessfullyBuy2'
import cartActions from '../redux/actions/cartActions'


const Payment = (props) =>{


    const token = localStorage.getItem('token')

    const [newForm , setNewForm] = useState({
        firstName: "",
        lastName: "",
        city: "",
        cellphone: "",
        direction: ""
    })
    const [creditCard, setCreditCard]= useState(null)
    const [nextStep, setNextStep] = useState("")

    const readInput = (e) =>{
        setNewForm({
            ...newForm,
            [e.target.name]: e.target.value
        })
    }
    const send = (e)=>{
        e.preventDefault()
        if (newForm.firstName!== '' && newForm.lastName!== '' && newForm.city!== '' && newForm.cellphone!=='' && newForm.direction!=='') {
            setNextStep('creditCard')
        }else{
            swal('All fields are required', 'Please, complete the required information', 'error')
        }        
    }
    const sendBuy = async (e) =>{
        e.preventDefault()
        const userId= props.userLogged.id
        const dataToSend = {...creditCard, ...newForm, ...props.finishedOrder,userId}
        const respuesta = await props.createOrder(dataToSend, token)
        if (respuesta.success) {
            setNextStep('success')
            props.deleteCart()
        } else{
            swal('Something went wrong', "You'll be redirected to Home", "error", {
                buttons: {
                  signup: {text: "Okay", value: "catch"},
                },
              })
              .then((value) => {
                switch (value) {           
                  case "catch":
                    props.history.push('/')
                    break         
                  default:
                    props.history.push('/')
                    break
                }
              })
        }
    }
    const cancelBuy=(()=> {
        swal({
            title: "Your buy will be cancelled",
            text: "Are you Sure?",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                props.history.push('/')
            } 
        });
    })


    let products =[]
    let totalToDolar=0


    
    if (!props.finishedOrder) {
        props.history.push('/')
    }else{
        products= props.finishedOrder && props.finishedOrder.products.map(product =>{
            return `${product.title ? product.title : product.productName}`
        }) 
        totalToDolar= (props.finishedOrder.total / 99).toFixed(2)        
    }
    return(
        <>      
            <div className="contenedorFormulario">
                {nextStep=== "" &&
                <div className='formularioBasicInformation animate__animated animate__fadeIn '>
                    <div className="divPasosFormularios">
                        <h2 className='pasoActivoInfoFormulario'>01 - Basic Information</h2>
                        <h2 className='pasoNoActivoInfoFormulario'>02 - Credit Card Information</h2>
                        <h2 className='pasoNoActivoInfoFormulario'>03 - Verify Information</h2>
                        <NavLink to='/'><div className='botonHomeFormulario'>Back To Home</div></NavLink>
                    </div>  
                    <div className="itemsContenedor">
                        <div className='divLabelInputForm'>
                            <label>First Name:</label>
                            <input className='inputFormularioBasicInfo' type="text" name="firstName" placeholder="Please, enter your first name"onChange={readInput}></input>                        
                        </div>
                        <div className='divLabelInputForm'>
                            <label>Last Name:</label>                                                  
                            <input className='inputFormularioBasicInfo' type="text" name="lastName" placeholder="Please, enter your lastName" onChange={readInput}></input>
                        </div>
                        <div className='divLabelInputForm'>
                            <label>City:</label>
                            <input className='inputFormularioBasicInfo' type="text" name="city" placeholder="Please, enter your city" onChange={readInput}></input>             
                        </div>
                        <div className='divLabelInputForm'>
                            <label>Cellphone number:</label>
                            <input className='inputFormularioBasicInfo' type="number" name="cellphone" placeholder="Please, enter your cellphone number" onChange={readInput}></input>   
                        </div>
                        <div className='divLabelInputForm'>
                            <label>Direction:</label>
                            <input className='inputFormularioBasicInfo' type="text" name="direction" placeholder="Please, enter your direction" onChange={readInput}></input>              
                        </div>
                        <button className="nextBotonFormulario" onClick={send}>Next</button>
                    </div>
                
                </div>}
                {nextStep === 'creditCard' &&
                <div className='contenedorInfoTarjeta'>
                    <div className='contentFormularioInforCard animate__animated animate__fadeIn '>   
                        <CreditCard setCreditCard={setCreditCard} setNextStep={setNextStep}/>
                        <Paypal setNextStep={setNextStep} compra={{concepto: `Game-X buy ${products}`, monto: totalToDolar}} />
                    </div> 
                </div>}
                {nextStep === 'verifyOrder' &&
                <div className='formOrderReview animate__animated animate__fadeIn'>                    
                            <h1 className='tituloFormularioTresPrincipal'>This is your order information:</h1>
                    <div className='divContentOrderReview'>                  
                        <div className='tercerFormCreditCard'>
                            <div>{props.finishedOrder.products.map((product,i) =>{
                                return  <div key={i} className='listadoProductosTercerForm'>
                                            <div className='divProductNameYPrice'>
                                                <h3>Product Name: </h3> <p>{product.title ? product.title : product.productName}</p>
                                            </div>
                                            <div className='divProductNameYPrice'>
                                                <h3>Unit price: </h3><p>${product.discount ? (-product.price * product.discount / 100 + product.price).toFixed(0) : product.price}</p>
                                            </div>
                                        </div>
                            })}</div>
                            <div className='divTotalPriceTercerForm'>
                                <h1 className='totalPriceFormTres'>Total price: </h1><p>${(props.finishedOrder.total).toFixed(0)}</p>
                            </div>
                            <div className='infoCompraFormTercero'>
                                        <div className='cadaDivInfoCompraTres'>
                                            {creditCard 
                                            ?<><h3>With yout card finished in: </h3><p>{creditCard.number.slice(12,16)}</p></>
                                            :null}
                                        </div>
                                        <div className='cadaDivInfoCompraTres'>
                                            <h3>To deliver in: </h3><p>{newForm.direction} - {newForm.city}</p>
                                        </div>
                                        <div className='cadaDivInfoCompraTres'>
                                            <h3>Contact Number: </h3><p>{newForm.cellphone}</p>
                                        </div> 
                                        <div className='cadaDivInfoCompraTres'>
                                            <h3>E-mail: </h3><p>{props.finishedOrder.email}</p>
                                        </div> 
                                <div className='cadaDivInfoCompraTresNombre'>
                                    <h3>In case your product requires a delivery, this could only be recieved by <span>{newForm.firstName} {newForm.lastName}</span> or other adult who validates his identity with ID and sign the delivery order. Otherwise, your buy has been storaged with the ID <span>{props.userLogged.id.slice(0,8)}</span></h3>
                                    <h3>If you agree with this terms, and all this information seems correct, please click the "Buy" button to finish the process.</h3>
                                </div>
                            </div>
                        </div>
                        <div className='ladoPasosFormularioTres'>
                            <h2 className='pasoNoActivoInfoFormulario'>01 - Basic Information</h2>
                            <h2 className='pasoNoActivoInfoFormulario'>02 - Credit Card Information</h2>
                            <h2 className='pasoActivoInfoFormulario'>03 - Verify Information</h2>
                        </div>  
                    </div> 
                    <div className='divContenidoBotonesTercerForm'>
                        <div onClick={cancelBuy} className='botonCancelFormulario'>Cancel</div>
                        <button className='nextBotonFormulario' onClick={sendBuy}>Buy</button>
                    </div>
                </div>}
                {nextStep === 'success' &&
                    <div className='contenedorUltimoFormCredit'>
                        
                        <div className='divAnimacionesFormCuatro'>
                            <SuccessfullyBuy1/>
                            <h1 className='reviewOrder'>Thanks for your buy!</h1>                            
                        </div>
                        <div className='divAnimacionesDosFormCuatro'>
                            <h1 className='infoDeliveryFormCuatro'>In case your product requires a delivery, We'll dispatch your product between the next 24hs, you should recieve your product in next 48hs!</h1>
                            <SuccessfullyBuy2/>
                        </div> 
                        <div className='divVolverFormCuatro'>
                            <NavLink to='/'><p className='botonHomeFormularioCuatro'>Back To Home</p></NavLink>
                            <p className='infoProblemaFormCuatro'>If you have any question or problem with the deliver, please contact us at gamex.arg@gmail.com or at WhatsApp +54 011-1515-1515</p>           
                        </div>       
                    </div>
                }
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        finishedOrder: state.cartReducer.finishedOrder,
        userLogged: state.userReducer.userLogged
    }
}
const mapDispatchToProps = {
    createOrder: buyActions.createOrder,
    deleteCart: cartActions.deleteCart
}

export default connect (mapStateToProps, mapDispatchToProps)(Payment)