
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <LoginForm />
    </div>
  );
};

export default Login;
