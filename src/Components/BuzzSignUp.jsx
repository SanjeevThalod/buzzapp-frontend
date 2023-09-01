import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function BuzzSignUp() {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [conPass,setConPass] = useState('');

  const handleSubmit = async ()=>{
    if(!name){
      alert('Enter name');
      return;
    }else if(!email){
      alert("Enter Email");
      return;
    }else if(!pass || !conPass){
      alert('Enter Password');
      return;
    }else if(pass !== conPass){
      alert('Both password must be same');
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
      const {data} = await axios.post(`${process.env.REACT_APP_URL}/login/creater`,mal,config);
      console.log(data);
      localStorage.setItem('userInfo',JSON.stringify(data));
      navigate('/dashcreater');
    } catch (error) {
      alert('Login as Normal User');
      console.log(error);
      navigate('/signup');
    }
    return;
  }
  useEffect(()=>{
    if(localStorage.getItem('userInfo')){
      navigate('/dashcreater')
    }
  },[])
  return (
    <div style={{ backgroundColor:'#1E1E1E', height: '100vh', backgroundSize: 'cover' }} className='flex items-center justify-center'>
      <div className='content-center' style={{ height: '60vh', width: '60%', margin: 'auto', marginTop: 'auto', marginBottom: 'auto', filter: 'brightness(1.0) contrast(1.0)' }}>
        <p className='content-center text-3xl font-black' style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF',marginBottom:'10px' }}>SIGN UP FOR</p>
        <p className='content-center text-3xl font-black' style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF' }}>BUZZFLUENCERS</p>
        <div className='form-control' style={{ color: 'black', marginTop: '60px' }}>
          <input onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' type='text' style={{ width: '40%', display: 'block', margin: '5px', height: '35px', borderRadius: '10px', padding: '25px', margin: 'auto', marginBottom: '30px' }}/>
          <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' type='email' style={{ width: '40%', display: 'block', margin: '5px', height: '35px', borderRadius: '10px', padding: '25px', margin: 'auto', marginBottom: '30px' }} />
          <input onChange={(e) => setPass(e.target.value)} value={pass} type="password" placeholder='Password' style={{ width: '40%', display: 'block', margin: '5px', height: '35px', borderRadius: '10px', padding: '25px', margin: 'auto', marginBottom: '20px' }} />
          <input onChange={(e) => setConPass(e.target.value)} value={conPass} type="password" placeholder='Password' style={{ width: '40%', display: 'block', margin: '5px', height: '35px', borderRadius: '10px', padding: '25px', margin: 'auto', marginBottom: '20px' }} />
          <button style={{ padding: '10px', backgroundColor: '#C76BFF', width: '40%', marginTop: '20px', borderRadius: '10px', boxShadow: '0px 0px 8px 0.08px black' }} className='font-bold' onClick={handleSubmit}>Proceed</button>
        </div>
      </div>
    </div>
  )
}
