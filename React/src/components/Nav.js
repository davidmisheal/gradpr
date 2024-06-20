import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Scroll } from "../func/Scroll";
import '@fortawesome/fontawesome-free/css/all.css';
import { useUser } from "../context/UserContext";

export default function Nav(props) {
  const { user, setUser, logout } = useUser();
  const isScrolled = Scroll(250);
  const [profileBox, setProfileBox] = useState(false);
  const [menuBox, setMenuBox] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)

  function handleUserState() {
    if (!user) {
      return
    }
    else {
      if (user.data.user.role == 'user') {
        setIsAdmin(false)
      }
      else {
        setIsAdmin(true)
      }
    }
  }

  useEffect(() => {
    handleUserState();
  }, [user]);
  // Function to toggle profile box and hide menu box if open
  const toggleProfileBox = () => {
    setProfileBox(!profileBox);
    if (!profileBox) setMenuBox(false);
  };

  // Function to toggle menu box and hide profile box if open
  const toggleMenuBox = () => {
    setMenuBox(!menuBox);
    if (!menuBox) setProfileBox(false);
  };

  return (
    <nav className='main-nav-body'>
      <div className="logo-search">
        <i className="fa-solid fa-bars" onClick={toggleMenuBox}></i>
        <span>
          <Link to={'/'} className="website-title">
            <h2>MeetThePharaohs</h2>
          </Link>
        </span>
        <i className="fa-regular fa-user" onClick={toggleProfileBox}></i>
      </div>
      <div>
        <ul className="nav-list">
          <li>
            <Link to={'/'} className="nav-link">Home</Link>
          </li>
          <li className="dropdown">
            <Link className="nav-link" to={'/allplaces'}>Tours</Link>
            <div className="dropdown-content">
              <Link className="nav-link" to={'/historical'}>Historical</Link>
              <Link className="nav-link" to={'/adventure'}>Adventure</Link>
              <Link className="nav-link" to={'/cultural'}>Cultural</Link>
              <Link className="nav-link" to={'/religious'}>Religious</Link>
              <Link className="nav-link" to={'/nautical'}>Nautical</Link>
              <Link className="nav-link" to={'/medical'}>Medical</Link>
            </div>
          </li>
          <li>
            <Link to={'/tourguides'} className="nav-link">Tour Guides</Link>
          </li>
          <li>
            <Link to={'/aboutus'} className="nav-link">About Us</Link>
          </li>
          <li>
            {isAdmin ?
              <Link className="nav-link" to={'/requests'}>Requests</Link>
              :
              <Link className="nav-link" to={'/mytrips'}>My Trips</Link>
            }
          </li>
          <li className="user-things">
            <i className="fa-regular fa-user fa-lg" onClick={toggleProfileBox}></i>
          </li>
        </ul>
      </div>
      {(profileBox || menuBox) && <div className="overlay-navbar"></div>}
      {profileBox && (
        <div className="profile-box">
          <Link to={'/profile'} ><i className="fa-solid fa-user fa-2xl"></i></Link>
          {
            user ?
              <Link to={'/'} className="profile-box-link" onClick={() => {
                logout()
              }}>Log Out</Link>
              :
              <Link to={'/signin'} className="profile-box-link">Sign In</Link>
          }
        </div>
      )}
      {menuBox && (
        <div className="menuBox">
          <ul>
            <li>
              <Link to={'/'} className="menunavlink">Home</Link>
            </li>
            <li>
              <Link to={'/allplaces'} className="menunavlink">Tours</Link>
            </li>
            <li>
              <Link to={'/tourguides'} className="menunavlink">Tour Guides</Link>
            </li>
            <li>
              <Link to={'/aboutus'} className="menunavlink">About Us</Link>
            </li>
            <li>
              <Link to={'/blog'} className="menunavlink">Blog</Link>
            </li>
            <li>
              <Link to={'/sign'} className="menunavlink">Log In</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
