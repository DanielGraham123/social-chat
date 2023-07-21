import React, { useEffect } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    console.log("user: ", user);
  }, [user]);

  return (
    <div className="Home">
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;
