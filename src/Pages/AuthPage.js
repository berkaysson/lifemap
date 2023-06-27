import React from "react";
import SignInForm from "../Components/Auth/SignIn/SignInForm";
import RegisterForm from "../Components/Auth/Register/RegisterForm";

const AuthPage = ({
  onUpdateRealtimeDatabase,
  onUpdateIndexedDatabase,
  handleLogin,
  handleLogOut,
  isSignedIn,
}) => {
  const handleUpdateRTDB = async () => {
    await onUpdateRealtimeDatabase();
  };

  const handleUpdateIDB = async () => {
    await onUpdateIndexedDatabase();
  };

  return (
    <div>
      <SignInForm
        handleLogin={handleLogin}
        handleLogOut={handleLogOut}
        isSignedIn={isSignedIn}
      />
      <RegisterForm />
      <button onClick={handleUpdateRTDB}>Update realtime DB</button>
      <button onClick={handleUpdateIDB}>Update indexed DB</button>
    </div>
  );
};

export default AuthPage;
