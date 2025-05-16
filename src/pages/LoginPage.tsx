// src/pages/LoginPage.tsx
import React, { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import logo from 'public/logo.svg';

const LoginPage: React.FC = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const login = useAppStore((state) => state.login);
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (usernameInput === 'admin' && passwordInput === 'admin') {
      login('admin');
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password.');
      toast.error("Invalid username or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm min-w-[320px] animate-slide">
        <CardHeader className="space-y-1 text-center">
          <img src={logo} alt="Logo" className="mx-auto mb-4 h-16 w-16 animate-spin" />
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter username 'admin' and password 'admin' to login.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="admin"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full mt-10">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;