import './App.scss'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/login'
import SignUp from './pages/signUp'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
