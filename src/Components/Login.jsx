import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();
  const [email,setEmail] = useState('thalodsanjeev@gmail.com');
  const [pass,setPass] = useState('12345678');
  const handleSubmit = async ()=>{
    if(!email || !pass){
      alert('Enter all Fields');
      return;
    }
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    const mal = {
      email:email,
      password:pass
    }
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_URL}/login`,mal,config);
      localStorage.setItem('userInfo',JSON.stringify(data));
      navigate('/dashboarduser');
    } catch (error) {
     console.log(error); 
    }
    return;
  }
  return (
    <div style={{backgroundColor:'#1E1E1E',height:'100vh',backgroundSize:'cover'}} className='flex items-center justify-center'>
      <div className='content-center' style={{height:'60vh',width:'60%',margin:'auto',marginTop:'auto',marginBottom:'auto',filter: 'brightness(1.0) contrast(1.0)'}}>
        <p className='content-center text-3xl font-black' style={{color:'white',letterSpacing:'1.5px', textShadow: '2px 2px 0px #C76BFF'}}>Login</p>
        <div className='form-control' style={{color:'black',marginTop:'60px'}}>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' type='email' style={{width:'40%',display:'block',margin:'5px',height:'35px',borderRadius:'10px',padding:'25px',margin:'auto',marginBottom:'30px'}}/>
          <input onChange={(e)=>setPass(e.target.value)} value={pass} type="password" placeholder='Password' style={{width:'40%',display:'block',margin:'5px',height:'35px',borderRadius:'10px',padding:'25px',margin:'auto',marginBottom:'20px'}}/>
          <p style={{color:'white',fontSize:'15px'}} className='font-bold'>Forgot Your Password?</p>
          <button style={{padding:'10px',backgroundColor:'#C76BFF',width:'40%',marginTop:'20px',borderRadius:'10px',boxShadow:'0px 0px 8px 0.08px black'}} className='font-bold' onClick={handleSubmit}>Login</button>
          <p style={{marginTop:'20px' ,marginBottom:'20px',color:'#C76BFF',fontSize:'30px',fontWeight:'900',textShadow:'0px 0px 4px black'}}>OR</p>
          <Link style={{marginTop:'10px' ,marginBottom:'20px',color:'#C76BFF',fontSize:'18px',fontWeight:'700',textShadow:'0px 0px 3px black',cursor:'pointer',display:'block'}} to='/loginCreater'>Sign Up for BUZZFLUENCERS</Link>
          <Link style={{marginTop:'10px' ,marginBottom:'20px',color:'#C76BFF',fontSize:'18px',fontWeight:'700',textShadow:'0px 0px 3px black',cursor:'pointer'}} to='/signup'>SignUP</Link>
        </div>
      </div>
    </div>
  )
}
