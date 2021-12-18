import React from "react";
import { useState } from "react";
import TextButton from "../Button/TextButton/TextButton";
import Input from "../Input/Input";
import InputForm from "../InputForm/InputForm";
import InputFormHeading from "../InputForm/InputFormHeading";

export default function Signup() {
  const [withEmail, setWithEmail] = useState(true);
  return (
    <div className="signup-comp">
      <div className="user-form signup-form">
        <InputForm>
          <InputFormHeading heading={"Create your account"} />
          <Input type="text" placeholder="Name" required focused/>
          <Input type="text" placeholder="Username" required/>
          {withEmail ? (
            <Input type="email" placeholder="Email" required/>
          ) : (
            <Input type="tel" placeholder="Phone" required/>
          )}
          <div className="singup-option-container">
            <TextButton
              type="button"
              className="default-btn signup-option"
              onClick={() => setWithEmail(!withEmail)}
            >
              Use {!withEmail ? "email" : "phone"} insted
            </TextButton>
          </div>
          <Input type="password" placeholder="Password" required/>
          <Input type="password" placeholder="Confirm Password" required/>
          <div className="signup-form-submit-btn">
            <TextButton type='submit' bcBlue rounded className='btn-disabled' >
              Signup
            </TextButton>
          </div>
        </InputForm>
      </div>
    </div>
  );
}
