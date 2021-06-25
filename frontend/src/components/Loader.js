import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from '../assets/skull-loop.json'

class UncontrolledLottie extends Component {


  render(){

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return(
      <div className='loader'>
        <Lottie  options={defaultOptions}
              height={700}
              width={700}
        />
        <h1 style={{color:'white'}}>Loading...</h1>
      </div>
    )
  }
}

export default UncontrolledLottie