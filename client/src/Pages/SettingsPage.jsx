import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function SettingsPage() {
  return (
    <>
      <div className="settingspage two-flex-col-container">
        <div className="col1 spc-1">
          <div className="settingspage-header">
            <span className="settingspage-text">Settings</span>
          </div>
          <div className="settings-links-container">
            <ul className="setting-links">
              <NavLink
                to="account"
                className={({ isActive }) =>
                  "setting-link" + (isActive ? " active-setting-link" : "")
                }
              >
                <span className="link-text">Your Account</span>
                <span className="link-icon">
                  <i className="far fa-chevron-right"></i>
                </span>
              </NavLink>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  "setting-link" + (isActive ? " active-setting-link" : "")
                }
              >
                <span className="link-text">Twitter Blue</span>
                <span className="link-icon">
                  <i className="far fa-chevron-right"></i>
                </span>
              </NavLink>
              <NavLink
                to="notifications"
                className={({ isActive }) =>
                  "setting-link" + (isActive ? " active-setting-link" : "")
                }
              >
                <span className="link-text">Notifications</span>
                <span className="link-icon">
                  <i className="far fa-chevron-right"></i>
                </span>
              </NavLink>
              <NavLink
                to="privacy_and_safety"
                className={({ isActive }) =>
                  "setting-link" + (isActive ? " active-setting-link" : "")
                }
              >
                <span className="link-text">Privacy and Safety</span>
                <span className="link-icon">
                  <i className="far fa-chevron-right"></i>
                </span>
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="col2 user-settings-content-container">
          <div className="user-settings-content">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
}
