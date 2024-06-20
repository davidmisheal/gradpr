import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";
import { useLocation } from "react-router-dom";

export default function MyTrips() {
    const location = useLocation()
    const { state } = location;
    const { user, setUser, logout } = useUser();
    return (
        <>
            <Nav />
            <div className="mytrips">
                <h2 className="mytrips-title">My Trips</h2>
                {
                    state && user? (
                        <div>
                            <h3>{state.name}</h3>
                            {/* Display other details of the place */}
                        </div>
                    ) : "No trips added yet."
                }
            </div>
            <Footer name='footer-main' />
        </>
    )
}