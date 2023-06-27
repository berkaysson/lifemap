import React, { useState } from "react";
import SignInForm from "../Components/Auth/SignIn/SignInForm";
import RegisterForm from "../Components/Auth/Register/RegisterForm";
import ToggleButton from "../Components/Wrappers/Styled-Elements/ToggleButton";
import styled from "styled-components";
import { CardWrapper } from "../Components/Wrappers/Styled-Wrappers/CardWrapper";
import FooterContent from "../Components/Contents/FooterContent";
import ParagraphContent from "../Components/Contents/ParagraphContent";
import Button from "../Components/Wrappers/Styled-Elements/Button";

const AuthPageWrapper = styled.div`
  flex: 1;
  margin: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.large};
  background-color: ${({ theme }) => theme.colors.secondary};
  overflow-x: hidden;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.theme};
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: ${({ theme }) => theme.boxShadows.largeCardShadow};
  height: 100%;
  width: 100%;
  max-width: 1200px;
  gap: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    margin: ${({ theme }) => theme.sizes.small};
    padding: ${({ theme }) => theme.sizes.medium};
  }

  @media (max-width: 425px) {
    margin: 0;
    border-radius: 0;
    padding: ${({ theme }) => theme.sizes.small};
    justify-content: space-around;
    height: 100vh;
  }

  @media (max-width: 375px) {
    padding: 1px;
    overflow-x: auto;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.sizes.large};
  gap: ${({ theme }) => theme.sizes.medium};

  & > Button {
    margin-top: 1rem;
  }
`;

const AuthPage = ({ handleLogin, handleLogOut, isSignedIn, openGuestMode }) => {
  const [formContent, setFormContent] = useState("sign-in");
  const [warning, setWarning] = useState("");

  const formContentHnadler = (mode) => {
    setFormContent(mode);
  };

  return (
    <AuthPageWrapper>
      <ParagraphContent>
        <b>LifeMap</b> is a versatile personal dashboard for managing habits,
        goals, tasks, activities, and finances.
        <br />
        Sign in, create a new account, or explore LifeMap with a guest account
        to get started on your journey of personal growth and productivity.
      </ParagraphContent>
      <CardWrapper>
        <ContentWrapper>
          <p>
            {formContent === "sign-in"
              ? "Not have an Account?  Register"
              : "Have an Account? Sign In"}
          </p>
          <ToggleButton
            onClick={formContentHnadler}
            options={[
              { label: "Sign In", value: "sign-in" },
              { label: "Register", value: "sign-up" },
            ]}
          />
          <p>{warning}</p>
          {formContent === "sign-in" ? (
            <SignInForm
              handleLogin={handleLogin}
              handleLogOut={handleLogOut}
              isSignedIn={isSignedIn}
            />
          ) : (
            <RegisterForm />
          )}
          <Button onClick={openGuestMode} type="button" text="Try with Guest Mode" />
        </ContentWrapper>
      </CardWrapper>
      <FooterContent />
    </AuthPageWrapper>
  );
};

export default AuthPage;
