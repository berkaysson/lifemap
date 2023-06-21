import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const loginHandler = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registerHandler = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  const consoleUser = () => {
    console.log(authUser);
  };

  return (
    <div>
      <form onSubmit={loginHandler}>
        <h3>Login</h3>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
      <div>--------</div>
      <form onSubmit={registerHandler}>
        <h3>Register</h3>
        <input
          onChange={(e) => setRegisterEmail(e.target.value)}
          type="email"
          placeholder="email"
          value={registerEmail}
        />
        <input
          onChange={(e) => setRegisterPassword(e.target.value)}
          type="password"
          placeholder="password"
          value={registerPassword}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={userSignOut} type="button">
        Sign Out
      </button>
      <p>{
        authUser ?
        authUser.email :
        "No user"
        }</p>
      <button onClick={consoleUser}>Console user</button>
    </div>
  );
};

export default SignIn;
