import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface LoginProps {
  onLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      if (onLogin) onLogin();
      else navigate('/');
    } else {
      setError(data.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-2">
      <Card className="w-full max-w-xs sm:max-w-sm shadow-xl border-none rounded-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
                className="text-base h-11"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="text-base h-11"
              />
            </div>
            {error && <div className="text-destructive text-sm text-center">{error}</div>}
          </CardContent>
          <CardFooter className="pt-0 flex flex-col gap-2">
            <Button className="w-full h-11 text-base" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
            <div className="text-center text-sm mt-2">
              Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login; 