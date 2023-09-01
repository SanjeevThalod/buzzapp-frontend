import React, { useState } from 'react'
import { useMyContext } from '../Context/MyContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DashCreater() {
  const navigate = useNavigate();
  const { user, setUser } = useMyContext();
  const [up, setUp] = useState(false);
  const [link, setLink] = useState('');
  const postDetails = async (vid) => {
    setUp(true);
    if (vid === undefined) {
      alert('Please select a file');
      return;
    }
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
    }
    setUp(false);
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
      const updatedUser = {...user,link:link}
      setUser(updatedUser);
      localStorage.setItem('userInfo',JSON.stringify(updatedUser));
    } catch (error) {
      console.log(error);
    }
    return;
  }
  const handleLogout = () =>{
    setUser([]);
    localStorage.removeItem('userInfo');
    navigate('/login');
  }
  return (
    <div style={{ height: '100%', backgroundColor: '#1e1e1e' }}>
      <p style={{ color: 'white' ,transform:'translate(500px,50px)',textDecoration:'underline',cursor:'pointer'}} onClick={()=>handleLogout()}>Logout</p>
      <p className='content-center text-3xl font-black' style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF', marginBottom: '30px' }}>Hi, </p>
      <p className='content-center text-3xl font-black' style={{ color: 'white', letterSpacing: '1.5px', textShadow: '2px 2px 0px #C76BFF', marginBottom: '50px' }}>Welcome {user.name}</p>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
        <p style={{ color: 'white', fontSize: '25px' }}>Your Old Video:</p>
        <iframe src={user.link}
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
        <input type="file"
          style={{ padding: '5px', backgroundColor: 'white', margin: '20px', borderRadius: '12px' }}
          p={1.5}
          accept='image/*, video/*'
          onChange={(event) => postDetails(event.target.files[0])}
        />
        <button style={{ color: 'purple', backgroundColor: 'white', padding: '8px', fontWeight: '700', cursor: 'pointer', borderRadius: '12px' }} onClick={() => handleSubmit()}>Update Video</button>
      </div>
      {up ? <div style={{ color: 'white' }}>Uploading</div> : null}
      <div style={{ color: 'white' }}>You need to reload to see the changes</div>
    </div>
  )
}
