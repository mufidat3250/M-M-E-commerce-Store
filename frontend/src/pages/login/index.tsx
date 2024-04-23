import { useState } from 'react'
import Input from '../../atoms/Input'
import './style.scss'




const Login = () => {
    const [name, setName] = useState('')
    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        )=> {
        setName(e.target.value)
    }
  return (
    <div>
      <Input type={'text'}  placeholder={''} value={name} label={'Full Name'} onChange={handleChange}/>
    </div>
  )
}

export default Login
