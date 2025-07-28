import React, { useEffect, useState } from 'react';
import { apiPost } from '../api/client';

interface ConfirmEmailResponse {
  success: boolean;
  message: string;
}

interface ConfirmEmailPayload {
  token_hash: string;
  type: string;
}

const ConfirmEmailSent: React.FC = () => {
  const [status, setStatus] = useState('confirming');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token_hash = urlParams.get('token_hash');
      const type = urlParams.get('type');
      
      if (token_hash && type) {
        try {
          const payload: ConfirmEmailPayload = {
            token_hash: token_hash,
            type: type,
          };
          
          const data = await apiPost<ConfirmEmailResponse, ConfirmEmailPayload>(
            '/auth/confirm-email', // Adjust endpoint to match your backend
            payload
          );
          
          if (data.success) {
            setStatus('success');
            setMessage(data.message || 'Email confirmed successfully!');
            // Redirect to login page after 2 seconds
            setTimeout(() => {
              window.location.href = '/login?confirmed=true';
            }, 2000);
          } else {
            setStatus('error');
            setMessage(data.message || 'Confirmation failed. Please try again.');
          }
        } catch (error) {
          setStatus('error');
          setMessage('Confirmation failed. Please try again.');
          console.error('Email confirmation error:', error);
        }
      } else {
        setStatus('error');
        setMessage('Invalid confirmation link.');
      }
    };

    confirmEmail();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        {status === 'confirming' && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Confirming your email...</p>
          </div>
        )}
        
        {status === 'success' && (
          <div>
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Email Confirmed!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        )}
        
        {status === 'error' && (
          <div>
            <div className="text-red-600 text-5xl mb-4">✗</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Confirmation Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button 
              onClick={() => window.location.href = '/register'}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Back to Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailSent;