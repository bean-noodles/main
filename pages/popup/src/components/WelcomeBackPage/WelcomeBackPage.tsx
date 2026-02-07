import { UserInfo } from "@extension/storage";
import "./WelcomeBackPage.css";
import HeaderWithoutLogin from "../Header/HeaderWithoutLogin";

interface WelcomeBackPageProps {
  user: UserInfo;
  onContinue: () => void;
}

const WelcomeBackPage = ({ user, onContinue }: WelcomeBackPageProps) => {
  return (
    <div className="welcome-back-page">
      <HeaderWithoutLogin />
      <img
        src={user.picture}
        alt={user.name}
        className="profile-image"
        referrerPolicy="no-referrer"
      />

      <div className="profile-name">{user.name}</div>
      <div className="profile-email">{user.email}</div>

      <div className="continue-button" onClick={onContinue}>
        <div className="continue-button-content">
          <div className="continue-button-text">이 계정으로 계속하기</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBackPage;
