import "@src/Popup.css";
import { useCallback, useEffect, useState } from "react";
import { withErrorBoundary, withSuspense, useStorage } from "@extension/shared";
import { ErrorDisplay, LoadingSpinner } from "@extension/ui";
import { userStorage, type UserInfo } from "@extension/storage";
import Header from "@src/components/Header/Header";
import MainPage from "@src/components/MainPage/MainPage";
import SettingPage from "@src/components/SettingPage/SettingPage";
import ProfilePage from "@src/components/ProfilePage/ProfilePage";
import LoginPage from "@src/components/LoginPage/LoginPage";
import RegisterSuccessPage from "@src/components/RegisterSuccessPage/RegisterSuccessPage";
import WelcomeBackPage from "@src/components/WelcomeBackPage/WelcomeBackPage";

type PageState =
  | "login"
  | "register_success"
  | "welcome_back"
  | "main"
  | "settings"
  | "profile";

const Popup = () => {
  const [page, setPage] = useState<PageState>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [tempUser, setTempUser] = useState<UserInfo | null>(null);
  const userState = useStorage(userStorage);

  useEffect(() => {
    if (userState.isLoggedIn && page === "login") {
      setPage("main");
    }
  }, [userState.isLoggedIn, page]);

  const handleGoogleLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Get Auth Token
      const authResult = await chrome.identity.getAuthToken({
        interactive: true,
      });
      if (!authResult.token) throw new Error("No token received");
      const token = authResult.token;

      // 2. Get User Info from Google
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch user info");
      const data = await response.json();

      const googleUser: UserInfo = {
        id: data.sub,
        email: data.email,
        name: data.name,
        picture: data.picture,
      };

      // 3. Check if user exists in backend
      try {
        const checkUserResponse = await fetch(
          "http://localhost:3000/user/getUser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: googleUser.email }),
          },
        );

        const existingUser = await checkUserResponse.json();

        if (existingUser) {
          // User exists -> Welcome Back
          setTempUser(googleUser);
          await userStorage.login(googleUser, token);
          setPage("welcome_back");
        } else {
          // User does not exist -> Register
          const registerResponse = await fetch(
            "http://localhost:3000/user/register",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(googleUser),
            },
          );

          if (!registerResponse.ok) throw new Error("Registration failed");

          await userStorage.login(googleUser, token);
          setPage("register_success");
        }
      } catch (backendError) {
        console.error("Backend error:", backendError);
        // Fallback or error handling
        alert("Failed to connect to server. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStart = () => setPage("main");
  const handleContinue = () => setPage("main");

  // Render Logic
  if (page === "login" && !userState.isLoggedIn) {
    return <LoginPage onLogin={handleGoogleLogin} isLoading={isLoading} />;
  }

  if (page === "register_success") {
    return <RegisterSuccessPage onStart={handleStart} />;
  }

  if (page === "welcome_back" && tempUser) {
    return <WelcomeBackPage user={tempUser} onContinue={handleContinue} />;
  }

  // Authenticated Pages
  return (
    <>
      <Header setPage={setPage} />
      {page === "main" && <MainPage />}
      {page === "settings" && <SettingPage setPage={setPage} />}
      {page === "profile" && <ProfilePage setPage={setPage} />}
    </>
  );
};

export default withErrorBoundary(
  withSuspense(Popup, <LoadingSpinner />),
  ErrorDisplay,
);
