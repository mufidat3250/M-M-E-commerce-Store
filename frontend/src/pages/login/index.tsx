import { useState } from "react";
import Input from "../../atoms/Input";
import "./style.scss";
import Button from "../../atoms/Button";
import useField from "../../hooks/useField";

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
            <p>Forget your Password?</p>
          </div>
         <div>
            <Button title="Submit" otherClass=""/>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
