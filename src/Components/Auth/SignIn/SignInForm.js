import React, { useState } from "react";

const SignInForm = ({ handleLogin, handleLogOut, isSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault();
    //form check and warnings
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
          <h3>Sign In</h3>
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignInForm;
