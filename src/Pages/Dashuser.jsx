import React, { useEffect, useState } from 'react'
import { useMyContext } from '../Context/MyContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import image from '../Components/Group 12.png'
import UserNavbar from '../Components/UserNavbar';

export default function Dashuser() {
  const navigate = useNavigate();
  const [createrData, setCreaterData] = useState();
  const { user } = useMyContext();
  const handleClick = async (element)=>{
    const mal={
      createrId:element._id,
      userId:user._id
    }
    const config = {
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${user.token}`
      }
    }
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_URL}/add/cohorts`,mal,config);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    navigate('/videopage',{state:{elementData:element}});
  }
  const fetchCreater = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${user.token}`
      }
    }
    console.log(config)
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_URL}/cohorts`, null, config);
      setCreaterData(data);
      console.log(data);
      console.log(createrData);
    } catch (error) {
      console.log(error);
    }
    return;
  };
 
  useEffect(() => {
    fetchCreater();
    // eslint-disable-next-line
  }, []);
  return (
    <>
    <UserNavbar/>
    <div style={{ height: '100%', backgroundColor: '#1e1e1e',overflow:'hidden' }}>
      <p className='content-center text-3xl font-black' style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF', marginBottom: '100px'}}>YOUR MENTORS</p>
      <div className="container">
        {createrData && createrData.map((element) => (
          <div style={{ marginTop: '0px' ,height:'400px',width:'60%'}} key={element._id}>
            <div style={{ color: 'white', backgroundColor: '#C76BFF', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ marginTop: 'auto', }} className='text-3xl font-black'>{element.name}</div>
              <div style={{ marginTop: 'auto', color: 'black', letterSpacing: '1.5px' }} className='text-2xl font-black'>{element.topic}</div>
              <button style={{ backgroundColor: 'white', color: 'black', borderRadius: '6px', padding: '8px', fontWeight: '700', width: '30%', margin: 'auto', cursor: 'pointer',border:'3px solid black' }} onClick={()=>handleClick(element)}>Join my cohort</button>
            </div>
            <img src={image} alt="" style={{ height: '350px', width: '250px', position: 'relative', transform: 'translate(450px,-275px)', display: 'inline' }} />
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
