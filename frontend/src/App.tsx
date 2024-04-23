import './App.scss'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/login'
import SignUp from './pages/signUp'

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
      </Routes>
    </div>
  )
}

export default App
