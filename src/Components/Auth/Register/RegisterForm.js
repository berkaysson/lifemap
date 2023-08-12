import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase";
import FormWrapper from "../../Wrappers/Styled-Wrappers/FormWrapper";
import StyledInput from "../../Wrappers/Styled-Elements/StyledInput";
import Button from "../../Wrappers/Styled-Elements/Button";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setwarning] = useState("");

  const handleSignUp = (event) => {
    event.preventDefault();
    setwarning("");
    if (password !== confirmPassword) {
      setwarning("Password and confirm password do not match.");
      alert(warning);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setwarning("");
        alert("Registered succesfully, you can sign in now");
      })
      .catch((error) => {
        alert(warning);
        console.log("Registration error:", error);
      });
  };

  return (
    <div>
      <FormWrapper onSubmit={handleSignUp} id="form">
      <h3>Sign Up</h3>
        <StyledInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button text="Sign Up" type="submit" />
      </FormWrapper>
    </div>
  );
};

export default RegisterForm;
