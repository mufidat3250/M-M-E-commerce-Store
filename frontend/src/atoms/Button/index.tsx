import './style.scss'

interface IButton {
    title:string;
    otherClass: string;
}

const Button = ( {title, otherClass }:IButton) => {
  return (
    <button className={` button ${otherClass}`}>
        {title}
    </button>
  )
}

export default Button
