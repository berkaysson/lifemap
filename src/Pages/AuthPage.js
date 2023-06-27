import React from "react";
import SignInForm from "../Components/Auth/SignIn/SignInForm";
import RegisterForm from "../Components/Auth/Register/RegisterForm";

const AuthPage = ({
  handleLogin,
  handleLogOut,
  isSignedIn,
}) => {

  return (
    <div>
      <SignInForm
        handleLogin={handleLogin}
        handleLogOut={handleLogOut}
        isSignedIn={isSignedIn}
      />
      <RegisterForm />
    </div>
  );
};

export default AuthPage;
