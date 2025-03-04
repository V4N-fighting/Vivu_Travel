
import React from "react";
import Banner from "../../Component/Banner";
import ProfileInfo from "./ProfileInfo";

interface ProfileProps {
  user?: string;
}

const Profile: React.FC<ProfileProps> = ({ user = "ngocvan" }) => {
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
