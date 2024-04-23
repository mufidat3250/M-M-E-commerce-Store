import './style.scss'
import { FaRegEyeSlash } from "react-icons/fa";

interface Iinput {
    type:string,
    placeholder:string,
    value:string,
    label:string,
    onChange:(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        )=> void 
} 

const Input = ({type, placeholder, label, value, onChange, ...others}:Iinput) => {
  return (
    <div className='input-wrapper'>
      <label htmlFor="fullname">{label}</label>
      <div className='input-container'>
        <input id='fullname' type={type ? type: "text"} placeholder={placeholder} value={value} onChange={onChange} {...others} />
      </div>
    </div>
  )
}

export default Input
