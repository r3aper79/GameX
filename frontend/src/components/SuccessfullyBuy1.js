import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from '../assets/confirm.json'

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
      <div className='successfullybuy1'>
        <Lottie  options={defaultOptions}
              height={200}
              width={200}
        />
      </div>
    )
  }
}

export default UncontrolledLottie