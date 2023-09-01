import React,{useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function VideoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const elem = location.state.elementData;
  console.log(elem);
  const headings = ['WEAK 1', 'WEAK 2', 'WEAK 3', 'WEAK 4'];
  const [selectedHeading, setSelectedHeading] = useState(headings[0]);
  const back = ()=>{
    navigate('/dashboarduser')
  }
  return (
    <div className="flex h-screen bg-1e1e1e" style={{overflow:'hidden'}}>
      <div className="w-1/4 bg-pinky p-4">
        <h1 className="text-3xl font-bold mb-4" style={{color:'white', textShadow: '2px 2px 0px #1e1e1e'}}>Roadmap</h1>
        <div style={{height:'80%',display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'Center'}}>
        {headings.map((heading) => (
          <div
            key={heading}
            className={`cursor-pointer py-2 px-4 ${
              selectedHeading === heading ? 'bg-blue-500 text-white' : ''
            }`}
            style={{color:'black',fontWeight:'900'}}
            onClick={() => setSelectedHeading(heading)}
          >
            {heading}
          </div>
        ))}
        </div>
      </div>
      <div className="w-3/4 bg-blacky p-4">
        <h1 className="text-pinky text-2xl font-semibold mb-4" style={{textShadow: '1px 1px 0px white',marginBottom:'75px'}}>Tutorial</h1>
        <div style={{ color: 'white', fontSize: '30px', transform: 'translate(400px,-110px)', cursor: 'pointer' }} onClick={() => back()}>
        <i class="fa-solid fa-arrow-left"></i>
      </div>
        <div className="aspect-w-16 aspect-h-9" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <iframe width="760" 
                  height="515" 
                  src={elem.link} 
                  title="YouTube video player" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen></iframe>
        </div>
      </div>
    </div>
  )
}
