import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ children, defaultMode = 'login' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(defaultMode); // 'login' or 'register'

  const handleClose = () => {
    setIsOpen(false);
    // Reset to default mode when closing
    setTimeout(() => setMode(defaultMode), 200);
  };

  const switchToLogin = () => {
    setMode('login');
  };

  const switchToRegister = () => {
    setMode('register');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        {mode === 'login' ? (
          <LoginForm
            onSwitchToRegister={switchToRegister}
            onClose={handleClose}
          />
        ) : (
          <RegisterForm
            onSwitchToLogin={switchToLogin}
            onClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
