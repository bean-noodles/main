import "./RegisterSuccessPage.css";

interface RegisterSuccessPageProps {
  onStart: () => void;
}

const RegisterSuccessPage = ({ onStart }: RegisterSuccessPageProps) => {
  return (
    <div className="register-success-page">
      <div className="success-icon">🎉</div>
      <h2 className="success-title">Registration Complete!</h2>
      <p className="success-subtitle">
        Your account has been successfully created.
      </p>

      <div onClick={onStart} className="start-button">
        <div className="start-button-content">
          <span className="start-button-text">Start Using Recon</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccessPage;
