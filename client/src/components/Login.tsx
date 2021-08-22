import React from 'react';

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <div>
      <button>
        <a href="http://localhost:8888/login">Log in</a>
      </button>
    </div>
  );
};
