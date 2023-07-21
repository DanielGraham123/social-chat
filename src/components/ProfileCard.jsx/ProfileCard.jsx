import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/AuthActions.js";

const ProfileCard = () => {
  const ProfilePage = true;
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout_ = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="ProfileName">
        <span>Zendaya MJ</span>
        <span>Senior UI/UX Designer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>6,890</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>1</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      <span>
        <a
          onClick={logout_}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Logout
        </a>
      </span>
    </div>
  );
};

export default ProfileCard;
