import React from "react";
import SignInForm from "../Components/Auth/SignIn/SignInForm";
import RegisterForm from "../Components/Auth/Register/RegisterForm";

const AuthPage = () => {

  return (
    <div>
      <SignInForm />
      <RegisterForm />
    </div>
  );
};

export default AuthPage;
