import instaLogo from "../../assets/images/Instagram_logo.svg"
import './SideNavbar.css'
import { FaInstagram } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineSlideshow } from "react-icons/md";
import { PiMessengerLogoBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { logout, useSelectorUserState } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import { useDispatch } from "react-redux";


export const SideNavbar = () => {
  const { isLoggedIn  } = useSelectorUserState();
  const navigate = useNavigate();
  const disPatch = useDispatch();

  const LogoutHandler = () => {
    disPatch(logout())
    navigate(AllRoutes.Login)
  }

  return (
    <div className='sidenav fixed flex flex-col justify-between z-10'>
        

      <div className="sidenav_buttons flex flex-col">
        <button className="sidenav_button mb-3">
        <FaInstagram/>
        </button>
        <button className="sidenav_button">
          <GoHomeFill/>
        </button>
        <button className="sidenav_button">
          <LuSearch/>
        </button>
        <button className="sidenav_button">
          <MdOutlineExplore/>
        </button>
        <button className="sidenav_button">
          <MdOutlineSlideshow/>
        </button>
        <button className="sidenav_button">
          <PiMessengerLogoBold/>
        </button>
        <button className="sidenav_button">
          <FaRegHeart/>
        </button>
        <button className="sidenav_button">
          <FaRegSquarePlus/>
        </button>
        <button className="sidenav_button">
          <CgProfile/>
        </button>
        <button className="sidenav_button" onClick={LogoutHandler}>
          Logout
        </button>
      </div>
    </div>

    
  )
}
