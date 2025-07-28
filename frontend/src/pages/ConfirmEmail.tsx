

const ConfirmEmailSent: React.FC = () => {
 return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-green-600 text-5xl mb-4">✓</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Email Confirmed!</h2>
        <p className="text-gray-600 mb-4">Your account has been verified successfully.</p>
        <a 
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
        >
          Continue to Login
        </a>
      </div>
    </div>
  );
};

export default ConfirmEmailSent;