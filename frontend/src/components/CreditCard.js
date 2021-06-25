import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
 
export default class PaymentForm extends React.Component {


  state = {
      creditCardData:{
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        },
  };
 
  handleInputFocus = (e) => {
    this.setState({
        ...this.state,
        creditCardData:{
            ...this.state.creditCardData,
            focus: e.target.name }})
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target    
    this.setState({
        ...this.state,
        creditCardData:{
            ...this.state.creditCardData,
            [name]: value }})
  }
  

  send = (e) => {
    e.preventDefault()
    if (this.state.creditCardData.cvc.length === 3 && this.state.creditCardData.expiry.length === 4 && this.state.creditCardData.name.includes(' ') && this.state.creditCardData.number.length === 16) {
      this.props.setCreditCard(this.state.creditCardData)
      this.props.setNextStep('verifyOrder')
    } else{
      swal("All fields are required", "Verify and try again", "error")
    }
  }

  
  render() {
    return (
      <div id="PaymentForm" className='divFomularioCreditCard'>
        <div className='formularioYTarjeta'>
          <div className='tarjetaDeCredito'>
            <Cards
              cvc={this.state.creditCardData.cvc}
              expiry={this.state.creditCardData.expiry}
              focused={this.state.creditCardData.focus}
              name={this.state.creditCardData.name}
              number={this.state.creditCardData.number}
            />  
          </div>
                
          <form className='formularioCreditCard'>
            <input
              type="tel"
              name="number"
              maxLength='16'
              placeholder="Card Number"
              autoComplete="false"
              autoFocus={true}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              type="string"
              name="name"
              placeholder="Owner Name"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              type="tel"
              name="expiry"
              maxLength='4'
              placeholder="Valid Thru"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              type="tel"
              name="cvc"
              id="cvc"
              maxLength='3'
              placeholder="CVC"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <button onClick={this.send} className='botonPayCreditCard'>Pay</button>
          </form>
        </div>
        <div className='divPasosDosCreditCard'>
          <h2 className='pasoNoActivoInfoFormulario'>01 - Basic Information</h2>
          <h2 className='pasoActivoInfoFormulario'>02 - Credit Card Information</h2>
          <h2 className='pasoNoActivoInfoFormulario'>03 - Verify Information</h2>
          <NavLink to='/'><div className='botonHomeCreditCard'>Back To Home</div></NavLink>
        </div>
      </div>
    );
  }
}