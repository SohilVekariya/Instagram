import React, { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import profiledemo from "../../assets/images/profiledemo.jpg";
import InputFileUpload from "../../components/shared/InputFileUpload";
import EditProfileForm from "./EditProfileForm";
import { getProfilePicture, useSelectorProfileState } from "../../redux/slices/ProfileSlice";
import { decodeToken } from "../../utils/AuthService";
import { useDispatch } from "react-redux";

const EditProfile = () => {
  const disPatch = useDispatch();
  const {success, profilePicture} = useSelectorProfileState();
  const userData = decodeToken();

  return (
    <HomeLayout>
      <div className="pt-4 px-8">
        <div className="font-semibold text-xl">Edit Profile</div>

        <div className="pt-8">
          <div className="profile__data flex justify-between items-center bg-gray-100 py-2 rounded-lg">
            <div className="flex gap-4">
              <div>
                <img
                  src={success ? profilePicture : profiledemo}
                  alt="profile"
                  className="rounded-full w-12 ms-4"
                />
              </div>
              <div>
                <div className="font-semibold">{userData && userData.UserName}</div>
                <div className="text-neutral-500">{userData && userData.Name}</div>
              </div>
            </div>
            <div className="flex justify-end me-4"><InputFileUpload/></div>
          </div>
        </div>

        <div className="mt-4">
            <EditProfileForm/>
        </div>
      </div>
    </HomeLayout>
  );
};

export default EditProfile;
