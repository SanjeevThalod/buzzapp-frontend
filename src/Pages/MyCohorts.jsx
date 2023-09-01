import React from 'react'
import { useMyContext } from '../Context/MyContext';
import image from '../Components/Group 12.png';
import progress from '../Components/Vector.png';
import { useNavigate } from 'react-router-dom';

export default function MyCohorts() {
  const navigate = useNavigate();
  const { user } = useMyContext();
  const back = () => {
    navigate('/profile')
  }
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#1e1e1e', overflow: 'hidden' }}>
      <div style={{ color: 'white', fontSize: '30px', transform: 'translate(100px,50px)', cursor: 'pointer' }} onClick={() => back()}>
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div style={{ height: '60%', margin: 'auto' }}>
        <p className='content-center text-3xl font-black'
          style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF' }}>
          MY COHORTS
        </p>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
            {user.cohorts && user.cohorts.map((elem) => (
              <div style={{ backgroundColor: 'white', height: '100px', width: '400px', borderRadius: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom:'40px' }}>
                <div style={{ paddingRight: '20px' }}>
                  <img src={image} style={{ height: '150px' }} alt="" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginRight: '120px' }}>
                  <p style={{ fontWeight: '700', padding: '5px' }}>{elem.name}</p>
                  <p style={{ fontWeight: '600', padding: '5px' }}>{elem.topic}</p>
                </div>
                <div>
                  <img src={progress} style={{ height: '40px' }} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
