import React from 'react'
import Wireframe from './Wireframe - 1.png';
import image from './Wireframe - 2.png'

export default function Hero() {
  return (
    <div style={{height:'90vh',width:'100vw',backgroundColor:'#1e1e1e'}}>
      <img src={Wireframe} alt={'img'}style={{height:'100%',width:'100%'}}></img>
      <img src={image} alt={'img'}style={{height:'100%',width:'100%',marginTop:'20px',backgroundColor:'#1e1e1e'}}></img>
    </div>
  )
}
