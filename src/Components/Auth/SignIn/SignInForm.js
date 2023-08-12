import React, { useState } from "react";
import StyledInput from "../../Wrappers/Styled-Elements/StyledInput";
import Button from "../../Wrappers/Styled-Elements/Button";
import FormWrapper from "../../Wrappers/Styled-Wrappers/FormWrapper";

const SignInForm = ({ handleLogin, handleLogOut, isSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault();
    handleLogin(email, password);
  };

  const handleSignOut = () => {
    handleLogOut();
  };

  return (
    <div>
      {isSignedIn ? (
        <button onClick={handleSignOut} type="button">
          Sign Out
        </button>
      ) : (
        <>
          <FormWrapper onSubmit={handleSignIn}>
            <h3>Sign In</h3>
            <StyledInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledInput
              autocomplete="current-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" text={"Sign In"} />
          </FormWrapper>
        </>
      )}
    </div>
  );
};

export default SignInForm;
