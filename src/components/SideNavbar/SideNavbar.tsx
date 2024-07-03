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
import {
  getProfilePicture,
  useSelectorProfileState,
} from "../../redux/slices/ProfileSlice";
import { AppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { decodeToken } from "../../utils/AuthService";
import profiledemo from "../../assets/images/profiledemo.jpg";

export const SideNavbar = () => {
  const { profilePicture, success } = useSelectorProfileState();
  const navigate = useNavigate();
  const disPatch = useDispatch<AppDispatch>();
  const userData = decodeToken();

  const [activeLink, setActiveLink] = useState();

  const LogoutHandler = () => {
    disPatch(logout());
    navigate(AllRoutes.Login);
  };

  useEffect(() => {
    const res = disPatch(getProfilePicture(userData.UserId));
  }, []);

  return (
    <div className="sidenav flex flex-col justify-between z-10 border-e-2 min-h-screen">
      <div className="sidenav_buttons flex flex-col ">
        <button>
          <Link to={AllRoutes.Home} className="sidenav_button mb-3">
            <FaInstagram />
          </Link>
        </button>
        <button
          className={`sidenav_button mb-3 ${
            activeLink === AllRoutes.Home ? "active" : ""
          }`}
          onClick={() => setActiveLink(AllRoutes.Home)}
        >
          <Link to={AllRoutes.Home}>
            <GoHomeFill />
          </Link>
        </button>
        <button
          className={`sidenav_button mb-3 ${
            activeLink === AllRoutes.Search ? "active" : ""
          }`}
          onClick={() => setActiveLink(AllRoutes.Search)}
        >
          <Link to={AllRoutes.Search}>
            <LuSearch />
          </Link>
        </button>
        <button
          className={`sidenav_button mb-3 ${
            activeLink === AllRoutes.Explore ? "active" : ""
          }`}
          onClick={() => setActiveLink(AllRoutes.Explore)}
        >
          <Link to={AllRoutes.Explore}>
            <MdOutlineExplore />
          </Link>
        </button>
        <button
          className={`sidenav_button mb-3 ${
            activeLink === AllRoutes.Reels ? "active" : ""
          }`}
          onClick={() => setActiveLink(AllRoutes.Reels)}
        >
          <Link to={AllRoutes.Reels}>
            <MdOutlineSlideshow />
          </Link>
        </button>
        <button
          className={`sidenav_button mb-3 ${
            activeLink === AllRoutes.Messages ? "active" : ""
          }`}
          onClick={() => setActiveLink(AllRoutes.Messages)}
        >
          <Link to={AllRoutes.Messages}>
            <PiMessengerLogoBold />
          </Link>
        </button>
        <button
          className={`sidenav_button mb-3 ${
            activeLink === AllRoutes.Notifications ? "active" : ""
          }`}
          onClick={() => setActiveLink(AllRoutes.Notifications)}
        >
          <Link to={AllRoutes.Notifications}>
            <FaRegHeart />
          </Link>
        </button>
        <button
          className={`sidenav_button mb-3 ${
            activeLink === AllRoutes.Create ? "active" : ""
          }`}
          onClick={() => setActiveLink(AllRoutes.Create)}
        >
          <Link to={AllRoutes.Create}>
            <FaRegSquarePlus />
          </Link>
        </button>
        <button
          className={`sidenav_button mb-3 ${
            activeLink === AllRoutes.Profile ? "active" : ""
          }`}
          onClick={() => setActiveLink(AllRoutes.Profile)}
        >
          <Link to={AllRoutes.Profile}>
            <img
              src={profilePicture ? profilePicture : profiledemo}
              alt="profile"
              className="rounded-full w-6 "
            />
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
