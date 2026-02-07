import "@src/Popup.css";
import { useState } from "react";
import { withErrorBoundary, withSuspense } from "@extension/shared";
import { ErrorDisplay, LoadingSpinner } from "@extension/ui";
import Header from "@src/components/Header/Header";
import MainPage from "@src/components/MainPage/MainPage";
import SettingPage from "@src/components/SettingPage/SettingPage";
import ProfilePage from "@src/components/ProfilePage/ProfilePage";

const Popup = () => {
  const [page, setPage] = useState<"main" | "settings" | "profile">("main");

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
