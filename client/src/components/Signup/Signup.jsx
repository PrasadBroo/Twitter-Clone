import React from "react";
import EmailInput from "../Input/EmailInput";
import TextInput from "../Input/TextInput";
import InputForm from "../InputForm/InputForm";
import InputFormHeading from "../InputForm/InputFormHeading";

export default function Signup() {
  return (
    <div className="signup-comp">
      <div className="user-form signup-form">
        <InputForm>
          <InputFormHeading heading={"Create your account"} />
          <TextInput placeHolder={"Name"} isFocused />
          <EmailInput />
        </InputForm>
      </div>
    </div>
  );
}
