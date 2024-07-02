import instaLogo from "../../assets/images/Instagram_logo.svg";
import "./SideNavbar.css";
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
import { Link, useNavigate } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import { useDispatch } from "react-redux";

export const SideNavbar = () => {
  const { isLoggedIn } = useSelectorUserState();
  const navigate = useNavigate();
  const disPatch = useDispatch();

  const LogoutHandler = () => {
    disPatch(logout());
    navigate(AllRoutes.Login);
  };

  return (
    <div className="sidenav flex flex-col justify-between z-10 border-e-2 min-h-screen">
      <div className="sidenav_buttons flex flex-col ">
        <button className="sidenav_button mb-3">
          <Link to={AllRoutes.Home}>
            <FaInstagram />
          </Link>
        </button>
        <button className="sidenav_button">
          <Link to={AllRoutes.Home}>
            <GoHomeFill />
          </Link>
        </button>
        <button className="sidenav_button">
          <Link to={AllRoutes.Search}>
            <LuSearch />
          </Link>
        </button>
        <button className="sidenav_button">
          <Link to={AllRoutes.Explore}>
            <MdOutlineExplore />
          </Link>
        </button>
        <button className="sidenav_button">
          <Link to={AllRoutes.Reels}>
            <MdOutlineSlideshow />
          </Link>
        </button>
        <button className="sidenav_button">
          <Link to={AllRoutes.Messages}>
            <PiMessengerLogoBold />
          </Link>
        </button>
        <button className="sidenav_button">
          <Link to={AllRoutes.Notifications}>
            <FaRegHeart />
          </Link>
        </button>
        <button className="sidenav_button">
          <Link to={AllRoutes.Create}>
            <FaRegSquarePlus />
          </Link>
        </button>
        <button className="sidenav_button">
          <Link to={AllRoutes.Profile}>
            <CgProfile />
          </Link>
        </button>
      </div>

      <div className="sidenav__more  bottom-1">
        <button className="sidenav_button" onClick={LogoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};
