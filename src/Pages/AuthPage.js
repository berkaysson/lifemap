import React from "react";
import SignInForm from "../Components/Auth/SignIn/SignInForm";
import RegisterForm from "../Components/Auth/Register/RegisterForm";

const AuthPage = ({
  onUpdateRealtimeDatabase,
  onUpdateIndexedDatabase,
}) => {
  const handleUpdateRTDB = async () => {
    await onUpdateRealtimeDatabase();
  };

  const handleUpdateIDB = async () => {
    await onUpdateIndexedDatabase();
  };

  return (
    <div>
      <SignInForm />
      <RegisterForm />
      <button onClick={handleUpdateRTDB}>Update realtime DB</button>
      <button onClick={handleUpdateIDB}>Update indexed DB</button>
    </div>
  );
};

export default AuthPage;
