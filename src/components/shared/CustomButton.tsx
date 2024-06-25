import { Link } from "react-router-dom";
type CustomButtonProps = {
  type: "button" | "submit" | "reset";
  title: string;
  clickHandler?: any | null;
  route: string;
  className: string;
  disable?: boolean;
};
const CustomButton = ({
  type = "button",
  title,
  clickHandler,
  route,
  className = "",
  disable = false,
} : CustomButtonProps) => {
  return (
    <button  type={type} className={className} onClick={clickHandler ?? null} disabled={disable}>
      {route ? <Link to={route}>{title}</Link> : <span>{title}</span>}
    </button>
  );
};

export default CustomButton;
