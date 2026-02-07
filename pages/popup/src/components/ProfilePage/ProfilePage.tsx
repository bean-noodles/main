import "@src/components/ProfilePage/ProfilePage.css";
import ArrowbackIcon from "@src/../public/icons/arrow_back.svg";
import ProfileIcon from "@src/../public/profile.svg";
import LogoutIcon from "@src/../public/icons/logout.svg";

interface ProfilePageProps {
  setPage: (page: "main" | "settings" | "profile") => void;
}

export default function ProfilePage({ setPage }: ProfilePageProps) {
  return (
    <div className="profile-page">
      {/* 뒤로가기 */}
      <div className="back-button" onClick={() => setPage("main")}>
        <img src={ArrowbackIcon} alt="Back" />
        <div className="back-button-text">뒤로 가기</div>
      </div>

      <img src={ProfileIcon} className="profile-image" alt="Profile" />
      <div className="profile-name">SYEONGMYING CHO</div>

      <div className="logout-button">
        <div className="logout-button-content">
          <img src={LogoutIcon} alt="Logout" />
          <div className="logout-button-text">로그아웃</div>
        </div>
      </div>
    </div>
  );
}
