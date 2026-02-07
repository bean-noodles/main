import { UserInfo } from "@extension/storage";

interface WelcomeBackPageProps {
  user: UserInfo;
  onContinue: () => void;
}

const WelcomeBackPage = ({ user, onContinue }: WelcomeBackPageProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-700">
        <img
          src={user.picture}
          alt={user.name}
          className="h-24 w-24 object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-100">
        Welcome back, <br />
        <span className="text-blue-600 dark:text-blue-400">{user.name}</span>
      </h2>

      <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
        {user.email}
      </p>

      <button
        onClick={onContinue}
        className="w-full max-w-xs rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95"
      >
        Continue
      </button>
    </div>
  );
};

export default WelcomeBackPage;
