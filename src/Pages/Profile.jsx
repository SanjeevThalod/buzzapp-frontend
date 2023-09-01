import React from 'react'
import image from '../Components/Screenshot 2023-08-31 162111.png'
import { useMyContext } from '../Context/MyContext'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useMyContext();
  const navigate = useNavigate();
  const clickHandler = ()=>{
    navigate('/mycohorts');
  }
  const back = ()=>{
    navigate('/dashboarduser')
  }
  const logoutHandler = ()=>{
    localStorage.removeItem('userInfo');
    navigate('/login');
  }
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#1e1e1e',overflow:'hidden' }}>
      <div style={{ color: 'white', fontSize: '30px', transform: 'translate(100px,50px)', cursor: 'pointer' }} onClick={() => back()}>
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div style={{ height: '60%', margin: 'auto' }}>
        <p className='content-center text-3xl font-black'
          style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF' }}>
          MY ACCOUNT
        </p>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px' }}>
          <div>
            <img src={image} alt="" style={{ height: '300px', width: '300px' }} />
          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',marginLeft:'80px',alignItems:'flex-start'}}>
            <p className='content-center text-2xl font-black'
              style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF' }}>
              {user.name}
            </p>
            <p className='content-center text-2xl font-black'
              style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF' }}>
              {user.email}
            </p>
            <p className='content-center text-2xl font-black' onClick={()=>clickHandler()}
              style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF',cursor:'pointer' }}>
              Cohorts joined: {user.cohorts.length}
            </p>
          </div>
            <p className='content-center text-xl font-black' onClick={()=>logoutHandler()}
              style={{ color: 'white', letterSpacing: '1.5px',cursor:'pointer',transform:'translate(0px,-80px)',textDecoration:'underline' }}>
              Logout
            </p>
        </div>
      </div>
    </div>
  )
}
