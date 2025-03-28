
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <RegisterForm />
    </div>
  );
};

export default Register;
