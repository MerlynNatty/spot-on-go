import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Signup = ({ onSignupSuccess }: { onSignupSuccess: () => void }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      onSignupSuccess();
    } else {
      setError(data.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-2">
      <Card className="w-full max-w-xs sm:max-w-sm shadow-xl border-none rounded-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {error && <div className="text-destructive text-sm text-center">{error}</div>}
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="text-base h-11"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="text-base h-11"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="text-base h-11"
            />
          </CardContent>
          <CardFooter className="pt-0 flex flex-col gap-2">
            <Button className="w-full h-11 text-base" type="submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <div className="text-center text-sm mt-2">
              Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
