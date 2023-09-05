import React, { useEffect, useState } from 'react'
import { useMyContext } from '../Context/MyContext'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

export default function DashCreater() {
  const navigate = useNavigate();
  const { user, setUser } = useMyContext();
  const [up,setUp] = useState(false);
  const [link, setLink] = useState('');
  const postDetail = async (vid) => {
    setUp(true);
    setTimeout(()=>postDetails(vid),2000);
  }
  const postDetails = async (vid) => {
    if (vid === undefined) {
      alert('Please select a file');
      return;
    }
    console.log(up)
    const formData = new FormData();
    formData.append('file', vid);
    formData.append("cloud_name", "dycxuzuon");
    formData.append("upload_preset", "chat-app");
    try {
      fetch(`${process.env.REACT_APP_CLOUDINARY}/image/upload`, {
        method: 'POST',
        body: formData
      }).then((res) => {
        return res.json();
      }).then((data) => {
        setLink(data.secure_url);
        console.log(data.secure_url);
      })
    } catch (error) {
      console.log({ cloudinaryError: error });
      setUp(false);
    }finally{
      setUp(false);
    }
    return;
  }
  const handleSubmit = async () => {
    if (!link) {
      alert('Upload the video first');
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      }
      const mal = {
        createrId: `${user._id}`,
        newLink: `${link}`
      }
      const { data } = await axios.put(`${process.env.REACT_APP_URL}/update`, mal, config);
      console.log(data);
      const updatedUser = { ...user, link: link }
      setUser(updatedUser);
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    } catch (error) {
      console.log(error);
    }
    return;
  }
  const handleLogout = () => {
    setUser([]);
    localStorage.removeItem('userInfo');
    navigate('/login');
  }
  useEffect(()=>{
    if(up){
      console.log(true);
    }
  },[up])
  useEffect(() => {
    console.log('before: ', user);
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) {
      setUser(storedUser);
    }
    console.log('after: ', user);
  }, [])
  return (
    <div style={{ height: '100%', backgroundColor: '#1e1e1e' }}>
      <p style={{ color: 'white', transform: 'translate(500px,50px)', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleLogout()}>Logout</p>
      <p className='content-center text-3xl font-black' style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF', marginBottom: '30px' }}>Hi, </p>
      <p className='content-center text-3xl font-black' style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF', marginBottom: '50px' }}>Welcome {JSON.parse(localStorage.getItem('userInfo')).name}</p>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
        <p style={{ color: 'white', fontSize: '25px' }}>Your Old Video:</p>
        <iframe src={JSON.parse(localStorage.getItem('userInfo')).link}
          frameborder="0"
          width="760"
          title='Your Video'
          height="515"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className='container'>
        <p style={{ color: 'white', fontSize: '25px' }}>Upload new Video here </p>
        {up && <span style={{ color: 'white',margin:'10px' }}>Uploading...</span>}
        <input type="file"
          style={{ padding: '5px', backgroundColor: 'white', margin: '20px', borderRadius: '12px' }}
          p={1.5}
          accept='image/*, video/*'
          onChange={(event) => postDetail(event.target.files[0])}
        />
        <button style={{ color: 'purple', backgroundColor: 'white', padding: '8px', fontWeight: '700', cursor: 'pointer', borderRadius: '12px',marginBottom:'20px' }} onClick={() => handleSubmit()}>Update Video</button>
      </div>
    </div>
  )
}
