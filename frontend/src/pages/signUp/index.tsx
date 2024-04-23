import './style.scss'
import Input from '../../atoms/Input'
import Button from '../../atoms/Button'
import useField from '../../hooks/useField'
import { useState } from 'react'
import { RxAvatar } from "react-icons/rx";
const SignUp = () => {
  const email = useField('email')
  const name = useField('text')
  const password = useField('password')
  const [isVisible, setIsVisible] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleFileUpload = (e) => {
    setAvatar(e?.target?.files[0])
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('i am clicked')
  }
  

  return (
    <div className="login">
    <div className="login-Container">
      <h2>Register as a new user</h2>
      <form onSubmit={handleSubmit} className="form">
      <Input
          type={name.type}
          placeholder=""
          value={name.input}
          label={"Full Name"}
          onChange={name.handleChange}
        />
        <Input
          
          type={email.type}
          placeholder=""
          value={email.input}
          label={"Email"}
          onChange={email.handleChange}           
        />
        <Input
          type={password.type}
          placeholder=""
          value={password.input}
          label={"Password"}
          onChange={password.handleChange}
          isVisible={isVisible}
          onEyeOpen={handleVisibility}
        />
        <div className="file-upload-wrapper">
          <div className='avatar'>
            {
              avatar ? <img src={URL.createObjectURL(avatar)} className='img'/>
                     : <RxAvatar className='w-full h-full'/> 
            }
          </div>
          <div className="">
            <span>Upload a file</span>
              <input type="file" className="file"  onChange={handleFileUpload} accept='.jpg,.png,.jpeg'/>
          </div>
        </div>
       <div>
          <Button title="Submit" otherClass=""/>
       </div>
       <div>
          <p className="text-gray-900 mt-2">Already have an account? <span className="text-blue-600 text-base cursor-pointer">Sign In</span></p>
         </div>
      </form>
    </div>
  </div>
  )
}

export default SignUp
