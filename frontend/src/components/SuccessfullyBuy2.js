import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from '../assets/delivery.json'

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
      <div className='successfullybuy2'>
        <Lottie  options={defaultOptions}
              height={100}
              width={250}
        />
      </div>
    )
  }
}

export default UncontrolledLottie