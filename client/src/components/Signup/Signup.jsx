import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../store/user/userActions";
import TextButton from "../Button/TextButton/TextButton";
import Input from "../Input/Input";
import InputForm from "../InputForm/InputForm";
import InputFormHeading from "../InputForm/InputFormHeading";

export default function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [isloading,setIsLoading] = useState(false);


  const handelSignupFormSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(email, name, username, password, confPassword);
    dispatch(signupUser(name,email,username,password,confPassword))
    // signup handel
    // handel error
  };
  const [withEmail, setWithEmail] = useState(true);
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
            disabled={isloading}
            focused={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Username"
            value={username}
            required
            disabled={isloading}
            focused={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {withEmail ? (
            <Input
              type="email"
              placeholder="Email"
              value={email}
              required
              disabled={isloading}
              focused={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <Input
              type="tel"
              placeholder="Phone"
              value={phone}
              required
              disabled={isloading}
              focused={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}
          <div className="singup-option-container">
            <TextButton
            disabled={isloading}
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
            disabled={isloading}
            focused={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            required
            disabled={isloading}
            value={confPassword}
            focused={confPassword}
            onChange={(e) => setconfPassword(e.target.value)}
          />
          <div className="signup-form-submit-btn">
            <TextButton
              type="submit"
              bcBlue
              rounded
              loading={isloading}
              disabled={
                !name || !email || !username || !password || !confPassword || isloading
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
