import { useState } from "react";
import Input from "../../atoms/Input";
import "./style.scss";
import Button from "../../atoms/Button";
import useField from "../../hooks/useField";
import { Link } from "react-router-dom";

const Login = () => {
  
  const [isVisible, setIsVisible] = useState(false);
  const name = useField('text')
  const password = useField('password')
  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="login">
      <div className="login-Container">
        <h2> Login to Your Account</h2>
        <div className="form">
          <Input
            
            type={name.type}
            placeholder=""
            value={name.input}
            label={"Full Name"}
            onChange={name.handleChange}           
          />
          <Input
            onEyeOpen={handleVisibility}
            type={password.type}
            placeholder=""
            value={password.input}
            label={"Password"}
            onChange={password.handleChange}
            isVisible={isVisible}
          />
          <div className="forgotPassword-wrapper">
            <div className="remember-me">
                <input type="checkbox" className="checkbox" id="remember-me" />
                <label htmlFor ='remember-me'>Remember me</label>
            </div>
            <p className="forgot-password">Forget your Password?</p>
          </div>
         <div>
            <Button title="Submit" otherClass=""/>
         </div>
         <div>
          <p className="text-gray-900 mt-2">Don't have an account? <Link to={'/signUp'} className="text-blue-600 text-base cursor-pointer">Sign Up</Link></p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
