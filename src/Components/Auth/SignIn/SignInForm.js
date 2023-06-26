import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isSignIn, setIsSignIn] = useState(() => {
    return auth.currentUser ? true : false;
  });

  const handleSignIn = (event) => {
    event.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful sign-in
        console.log("Sign-in successful:", userCredential.user);
        setIsSignIn(true);
      })
      .catch((error) => {
        // Handle sign-in errors
        setError(error.message);
        console.log("Sign-in error:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Handle successful sign-out
        console.log("Sign-out successful", auth);
        setIsSignIn(false);
      })
      .catch((error) => {
        // Handle sign-out errors
        console.log("Sign-out error:", error);
      });
  };

  return (
    <div>
      {isSignIn ? (
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

      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInForm;
