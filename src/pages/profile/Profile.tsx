import React, { Children, useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { LuBadge } from "react-icons/lu";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { FaUserTag } from "react-icons/fa";
import { PiSquaresFourLight } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { AllRoutes } from "../../constants/Routes";
import Posts from "./Posts";
import Saved from "./Saved";
import Tagged from "./Tagged";
import {useSelectorProfileState } from "../../redux/slices/ProfileSlice";
import profiledemo from "../../assets/images/profiledemo.jpg"
import { decodeToken } from "../../utils/AuthService";
import EditProfile from "./EditProfile";
import { useSelectorUserState } from "../../redux/slices/AuthSlice";

export const Profile = () => {
  let { tab } = useParams();
 
  const {success, profilePicture} = useSelectorProfileState();
  const userData = decodeToken();
  console.log(userData);

  if (!tab) {
    tab = 'posts';
  }
  return (
    <HomeLayout>
      <div className="px-4 py-6">
        <div className="part__1 flex px-9 gap-12 mt-5">
          <div className="profile__image px-12">
            <img
              src={success ? profilePicture : profiledemo}
              alt=""
              width={200}
              className="rounded-full"
            />
          </div>
          <div className="profile__content flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <div className="text-lg">{userData.UserName}</div>
              <Link to={AllRoutes.EditProfile} className="bg-zinc-100 px-3 py-1 rounded-md font-semibold">
                Edit profile
              </Link>
              <button className="bg-zinc-100 px-3 py-1 rounded-md font-semibold">
                View archive
              </button>
              <div className="flex ">
                <LuBadge />
              </div>
            </div>
            <div className="flex gap-8">
              <div>
                <span className="font-semibold">2</span> <span>Posts</span>
              </div>
              <button className="">
                <span className="font-semibold">415 </span>
                <span>followers</span>
              </button>
              <button className="">
                <span className="font-semibold">507 </span>
                <span>following</span>
              </button>
            </div>
            <div className="fullname__Bio">
              <div className="fullname font-semibold">{userData.Name}</div>
              <div className="bio flex flex-col">
                <p>LDCE_24</p>
                <p>It Engineering</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="border-t border-gray-200 dark:border-gray-700 flex justify-center">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="me-2">
                <Link
                  to={`${AllRoutes.Profile}/posts`}
                  className={`inline-flex items-center justify-center p-4  ${
                  tab === 'posts'
                    ? 'text-blue-600 border-t-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                    : 'border-t-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                } group`}
                  aria-current="page"
                >
                  <PiSquaresFourLight className="text-xl me-1" /> POSTS
                </Link>
              </li>
              <li className="me-2">
                <Link
                  to={`${AllRoutes.Profile}/saved`}
                  className={`inline-flex items-center justify-center p-4 ${
                    tab === "saved"
                      ? "text-blue-600 border-t-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-t-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  } group`}
                >
                  <PiBookmarkSimpleLight className="text-xl me-1" /> SAVED
                </Link>
              </li>
              <li className="me-2">
                <Link
                  to={`${AllRoutes.Profile}/tagged`}
                  className={`inline-flex items-center justify-center p-4 ${
                    tab === "tagged"
                      ? "text-blue-600 border-t-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-t-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  } group`}
                >
                  <FaUserTag className="text-xl me-1" /> TAGGED
                </Link>
              </li>
            </ul>
          </div>
          <div className='tab-content'>
          {tab === 'posts' && (
            <Posts/>
          )}
          {tab === 'saved' && (
           <Saved/>
          )}
          {tab === 'tagged' && (
            <Tagged/>
          )}
        </div>
        </div>
      </div>
    </HomeLayout>
  );
};
