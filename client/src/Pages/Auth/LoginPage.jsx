import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LinkButton from "../../components/Button/LinkButton/LinkButton";
import Textbutton from "../../components/Button/TextButton/TextButton";
import Footer from "../../components/Footer/Footer";
import twiImg from "../../static/images/lohp_en_1302x955.png";
import {
  googleAuthenticationUrl,
  githubAuthenticationUrl,
} from "./../../services/authenticationServices";

export default function LoginPage() {
  const navigate = useNavigate();
  const handelSignupClick = () => {
    navigate("/flow/signup");
  };
  const handelLoginClick = () => {
    navigate("/flow/login");
  };

  return (
    <>
      <main className="main-content login-page">
        <div className=" auth-container">
          <div className="logo-container">
            <i className="fab fa-twitter logo"></i>
          </div>
          <div className="heading-container">
            <h2 className="heading-2">Happening Now</h2>
          </div>
          <div className="sub-heading">
            <h2 className="join-twitter heading-3">Join Twitter Today</h2>
          </div>
          <div className="signup-links">
            <LinkButton
              href={googleAuthenticationUrl()}
              linkText={"Sign up with Goolgle"}
              img={"https://img.icons8.com/color/48/000000/google-logo.png"}
            />

            <div className="with-phone-email">
              <LinkButton
                icon={<i className="fab fa-github"></i>}
                href={githubAuthenticationUrl()}
                linkText={"Sign up with Github"}
                customstyle={{ fontWeight: 600 }}
              />
            </div>
            <div className="divider">
              <div className="left-divider"></div>
              <div className="or-text">or</div>
              <div className="right-divider"></div>
            </div>
            <div className="signup-btn">
              <Textbutton rounded bcBlue onClick={handelSignupClick}>
                Sign up with phone or email
              </Textbutton>
            </div>
          </div>
          <div className="terms-conditions-container">
            <p className="terms-conditions-text">
              By signing up, you agree to the{" "}
              <Link className="default-link" to="#">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="default-link" to="#">
                Privacy Policy
              </Link>{" "}
              , including{" "}
              <Link to="#" className="default-link">
                Cookie Use
              </Link>{" "}
              .
            </p>
          </div>
          <div className="account-exist-container">
            <div className="account-exist-text-wrap">
              <p className="account-exist-text">Already have an account?</p>
            </div>
            <div className="sign-in-btn-container">
              <Textbutton rounded cBlue onClick={handelLoginClick}>
                Sign in
              </Textbutton>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img src={twiImg} alt="twitter" className="twitter-image" />
          <i className="fab fa-twitter absolute-center-logo"></i>
        </div>
      </main>
      <Footer />
      <Outlet />
    </>
  );
}
