
import React from "react";
import Banner from "../../Component/Banner";
import ProfileInfo from "./ProfileInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface ProfileProps {
}

const Profile: React.FC<ProfileProps> = () => {
  const user = useSelector((state: RootState) => state.user.data);

  console.log("user ở trang profile: ", user)
  return (
    <>
      <Banner
        background={
          "https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"
        }
        pageName={"Profile"}
        thisPage={"/profile"}
      />
      <ProfileInfo user={user} />
    </>
  );
};

export default Profile;
