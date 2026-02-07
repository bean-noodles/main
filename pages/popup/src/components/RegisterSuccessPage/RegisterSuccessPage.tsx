import { LoadingSpinner } from "@extension/ui";

interface RegisterSuccessPageProps {
  onStart: () => void;
}

const RegisterSuccessPage = ({ onStart }: RegisterSuccessPageProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 text-5xl">🎉</div>
      <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
        Registration Complete!
      </h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Your account has been successfully created.
      </p>

      <button
        onClick={onStart}
        className="w-full max-w-xs rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95"
      >
        Start Using Recon
      </button>
    </div>
  );
};

export default RegisterSuccessPage;
