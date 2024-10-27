"use client";
import React from 'react';
import { FaGoogle } from 'react-icons/fa6';
import Button from '../Button/Button';
import { useAuth0 } from '@auth0/auth0-react';


const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      'https://accounts.google.com/InteractiveLogin/signinchooser?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F%26ogbl%2F&emr=1&ltmpl=default&ltmplcache=2&osid=1&passive=true&rm=false&scc=1&service=mail&ss=1&ifkv=ARpgrqcmOypIjei3S6zVmy6WXvmZWLf8CoLp-H1a9YzIpxzN-hNt8mAwrKJ8nz4ruqwLrYeUdfB1gw&ddm=0&flowName=GlifWebSignIn&flowEntry=ServiceLogin'; // Backend URL
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      className="flex flex-row justify-center items-center w-[225px] " 
    >
      <span className="me-2">
        <FaGoogle />
      </span>
      <span className="text-center">Continuar con Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
