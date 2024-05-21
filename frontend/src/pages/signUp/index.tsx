import './style.scss'
import Input from '../../atoms/Input'
import Button from '../../atoms/Button'
import useField from '../../hooks/useField'
import { useState } from 'react'
import userServices from '../../services/user'
// import { RxAvatar } from "react-icons/rx";
import { Link } from 'react-router-dom'
const SignUp = () => {
  const email = useField('email')
  const name = useField('text')
  const password = useField('password')
  const [isVisible, setIsVisible] = useState(false)
  // const [avatar, setAvatar] = useState(null)
  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if(file){
      // setAvatar(file[0])
      console.log('file uploaded')
    }
  }
  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email, name, password)

    const newUser = {
      email:email.input,
      name: name.input,
      password:password.input,
      // file: avatar
    }
   try {
    await userServices.createUser(newUser)
   } catch (error) {
    console.log(error)
    console.log('something went wrong')
   }
   email.onReset()
   name.onReset()
   password.onReset()
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
              // avatar ? <img src={URL.createObjectURL(avatar)} className='w-full h-full'/>
              //        : <RxAvatar className='w-full h-full'/> 
            }
          </div>
          <label className="upload-wrapper">
              <input type="file" placeholder='hello' className="  outline-none bg-gray-600"  onChange={handleFileUpload} accept='.jpg,.png,.jpeg'/>
            <span>Upload a file</span>
          </label>
        </div>
       <div>
          <Button title="Submit" otherClass=""/>
       </div>
       <div>
          <p className="text-gray-900 mt-2">Already have an account? <Link to={'/login'} className="text-blue-600 text-base cursor-pointer">Sign In</Link></p>
         </div>
      </form>
    </div>
  </div>
  )
}

export default SignUp
