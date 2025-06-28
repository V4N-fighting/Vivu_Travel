
import React from "react";
import Banner from "../../Component/Banner";
import ProfileInfo from "./ProfileInfo";
import { useCurrentUser } from "../../Hooks/useCurrentUser";
import { User } from "../../service/authService";

interface ProfileProps {
}

const Profile: React.FC<ProfileProps> = () => {
  const user: User | null = useCurrentUser();
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
