import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useState } from "react";
import { useUser } from "../context/UserContext"; // Import useUser hook

import ChangePassword from "../components/ChangePassword";
export default function Profile() {
  const [edit, setEdit] = useState(false)
  const { user } = useUser(); // Use the user data

  return (
    <>
      <Nav />
      {console.log(user)}
      <div className="profile-main">
        <div className="profile-part">
          <i class="fa-solid fa-user fa-2xl"></i>
          <span className="profile-email">
            <h2>E-Mail</h2>
            <p>{user ? user.data.user.email : "Loading..."}</p>
          </span>
          <span className="profile-pass">
            <span>
              <h2>Password</h2>
              <p>*************</p>
            </span>
            <i className="fa-regular fa-pen-to-square" onClick={() => setEdit(!edit)}></i>
            {edit ? '' : <ChangePassword />}
          </span>
        </div>
      </div>
      <Footer name="footer-main" />
    </>
  )
}