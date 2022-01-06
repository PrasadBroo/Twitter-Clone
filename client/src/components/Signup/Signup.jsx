import React from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { signupUser } from "../../store/user/userActions";
import TextButton from "../Button/TextButton/TextButton";
import Input from "../Input/Input";
import InputForm from "../InputForm/InputForm";
import InputFormHeading from "../InputForm/InputFormHeading";
import {  selectSingupError,selectSingupStart } from "../../store/user/userSelector";

export default function Signup() {
  const state = useSelector(state=>state)
  let signupError = selectSingupError(state);
  let singupStart = selectSingupStart(state);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [withEmail, setWithEmail] = useState(true);


  const handelSignupFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(name,email,username,password,confPassword))
    // signup handel
    // handel error
  };

  return (
    <div className="signup-comp">
      <div className="user-form signup-form">
        <InputForm onSubmit={handelSignupFormSubmit}>
          <InputFormHeading heading={"Create your account"} />
          <Input
            type="text"
            placeholder="Name"
            value={name}
            required
            disabled={singupStart}
            focused={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            required
            disabled={singupStart}
            focused={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {withEmail ? (
            <Input
              type="email"
              placeholder="Email"
              value={email}
              required
              disabled={singupStart}
              focused={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <Input
              type="tel"
              placeholder="Phone"
              value={phone}
              required
              disabled={singupStart}
              focused={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}
          <div className="singup-option-container">
            <TextButton
            disabled={singupStart}
              type="button"
              className="default-btn signup-option"
              onClick={() => setWithEmail(!withEmail)}
            >
              Use {!withEmail ? "email" : "phone"} insted
            </TextButton>
          </div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            required
            disabled={singupStart}
            focused={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            disabled={singupStart}
            value={confPassword}
            focused={confPassword}
            onChange={(e) => setconfPassword(e.target.value)}
          />
           {signupError && <p className="singup-error-message">{signupError}</p>}
          <div className="signup-form-submit-btn">
            <TextButton
              type="submit"
              bcBlue
              rounded
              loading={singupStart}
              disabled={
                !name || !email || !username || !password || !confPassword || singupStart
              }
            >
              Signup
            </TextButton>
          </div>
        </InputForm>
      </div>
    </div>
  );
}
