import { Link } from "react-router-dom";
type CustomButtonProps = {
  type: "button" | "submit" | "reset";
  title: string;
  clickHandler: any;
  route: string;
  className: string;
};
const CustomButton = ({
  type = "button",
  title,
  clickHandler,
  route,
  className = "",
} : CustomButtonProps) => {
  return (
    <button  type={type} className={className} onClick={clickHandler ?? null}>
      {route ? <Link to={route}>{title}</Link> : <span>{title}</span>}
    </button>
  );
};

export default CustomButton;
