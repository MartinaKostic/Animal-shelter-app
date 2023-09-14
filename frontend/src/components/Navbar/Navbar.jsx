/* eslint-disable react/prop-types */
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import ModeContext from "../ModeContext";

//o nama exact
export default function Navbar({ changeContext }) {
  const modeContextValue = useContext(ModeContext);
  const mode = useContext(ModeContext);

  const changeMode = () => {
    changeContext();
  };

  return (
    <nav className="navbar">
      <div className="logotype">
        <img src="/pet-house.png" alt="Adopt Me" className="icon"></img>
        <h1>Adopt Me</h1>
      </div>
      <div className="navigation">
        {mode == "user" ? (
          <NavLink
            style={({ isActive }) => ({
              background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
            })}
            to="/"
          >
            About us
          </NavLink>
        ) : null}

        <NavLink
          style={({ isActive }) => ({
            background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
          })}
          to="/list"
        >
          List
        </NavLink>
        {mode == "admin" ? (
          <NavLink
            style={({ isActive }) => ({
              background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
            })}
            to="/input"
          >
            Input
          </NavLink>
        ) : null}
        <NavLink
          style={({ isActive }) => ({
            background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
          })}
          to="/donations"
        >
          Donations
        </NavLink>
        {/* <NavLink
          style={({ isActive }) => ({
            background: isActive ? "rgba(255, 255, 255, 0.6)" : "transparent",
          })}
          to="/notices"
        >
          Notices
        </NavLink> */}
        <div className="contextButton">
          <label className="toggle-switch">
            <span>ADMIN</span>
            <input
              type="checkbox"
              name="admin"
              checked={modeContextValue == "admin"}
              onChange={changeMode}
            ></input>
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </nav>
  );
}
