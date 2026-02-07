import "@src/components/ProfilePage/ProfilePage.css";
import ArrowbackIcon from "@src/../public/icons/arrow_back.svg";
import LogoutIcon from "@src/../public/icons/logout.svg";
import { userStorage } from "@extension/storage";
import { useStorage } from "@extension/shared";

interface ProfilePageProps {
  setPage: (page: "main" | "settings" | "profile") => void;
}

export default function ProfilePage({ setPage }: ProfilePageProps) {
  const userState = useStorage(userStorage);
  const user = userState.user;

  const handleLogout = async () => {
    await userStorage.logout();
    setPage("main"); // Popup.tsx will redirect to login if not logged in
  };

  if (!user) {
    return null; // Should not happen if accessed from authenticated state
  }

  return (
    <div className="profile-page">
      {/* 뒤로가기 */}
      <div className="back-button" onClick={() => setPage("main")}>
        <img src={ArrowbackIcon} alt="Back" />
        <div className="back-button-text">뒤로 가기</div>
      </div>

      <img
        src={user.picture}
        className="profile-image"
        alt={user.name}
        referrerPolicy="no-referrer"
      />
      <div className="profile-name">{user.name}</div>
      <div className="profile-email">{user.email}</div>

      <div className="logout-button" onClick={handleLogout}>
        <div className="logout-button-content">
          <img src={LogoutIcon} alt="Logout" />
          <div className="logout-button-text">로그아웃</div>
        </div>
      </div>
    </div>
  );
}
