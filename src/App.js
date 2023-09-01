import './App.css';
import Home from './Pages/Home';
import Login from './Components/Login.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import SignUp from './Components/SignUp';
import BuzzSignUp from './Components/BuzzSignUp';
import Dashuser from './Pages/Dashuser';
import { MyContextProvider } from './Context/MyContext';
import VideoPage from './Pages/VideoPage';
import Profile from './Pages/Profile';
import MyCohorts from './Pages/MyCohorts';
import DashCreater from './Pages/DashCreater';

function App() {
  return (
    <Router>
      <div className="App">
          <MyContextProvider>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/loginCreater' element={<BuzzSignUp />} />
            <Route exact path='/dashboarduser' element={<Dashuser />} />
            <Route exact path='/videopage' element={<VideoPage/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route exact path='/mycohorts' element={<MyCohorts/>}/>
            <Route exact path='/dashcreater' element={<DashCreater/>}/>
        </Routes>
          </MyContextProvider>
      </div>
    </Router>
  );
}

export default App;
