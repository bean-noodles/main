import { useStorage } from "@extension/shared";
import { userStorage } from "@extension/storage";
import HeaderWithoutLogin from "../Header/HeaderWithoutLogin";
import "./RegisterSuccessPage.css";

interface RegisterSuccessPageProps {
  onStart: () => void;
}

const RegisterSuccessPage = ({ onStart }: RegisterSuccessPageProps) => {
  const userState = useStorage(userStorage);
  const user = userState.user;

  return (
    <div className="register-success-page">
      <HeaderWithoutLogin />

      {user && (
        <img
          src={user.picture}
          alt={user.name}
          className="profile-image"
          referrerPolicy="no-referrer"
        />
      )}

      <h2 className="profile-name">회원가입이 완료되었습니다.</h2>
      {user && <p className="profile-email">{user.name}</p>}

      <div onClick={onStart} className="start-button">
        <div className="start-button-content">
          <span className="start-button-text">시작하기</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccessPage;
