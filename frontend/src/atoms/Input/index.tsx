import "./style.scss";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

interface Iinput {
  type: string;
  placeholder: string;
  value: string;
  label: string;
  isVisible?: boolean;
  onEyeOpen?: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const Input = ({
  type,
  placeholder,
  label,
  value,
  onChange,
  onEyeOpen,
  isVisible,
  ...others
}: Iinput) => {
  return (
    <div className="input-wrapper">
      <label htmlFor="fullname">{label}</label>
      <div className="input-container">
        <input
          id="fullname"
          type={isVisible && type === "password" ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...others}
        />
        {type === "password" && (
          <span className="eye-icon" onClick={onEyeOpen}>
            {" "}
            {isVisible ? (
              <AiOutlineEye className="w-5 h-5" />
            ) : (
              <AiOutlineEyeInvisible className="w-5 h-5" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
