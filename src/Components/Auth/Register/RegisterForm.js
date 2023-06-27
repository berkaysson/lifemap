import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase";
import FormWrapper from "../../Wrappers/Styled-Wrappers/FormWrapper";
import StyledInput from "../../Wrappers/Styled-Elements/StyledInput";
import Button from "../../Wrappers/Styled-Elements/Button";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = (event) => {
    event.preventDefault();
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful registration
        console.log("Registration successful:", userCredential.user);
      })
      .catch((error) => {
        // Handle registration errors
        setError(error.message);
        console.log("Registration error:", error);
      });
  };

  return (
    <div>
      <FormWrapper onSubmit={handleSignUp}>
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
        <Button text="Sign Up" type="submit" />
      </FormWrapper>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterForm;
