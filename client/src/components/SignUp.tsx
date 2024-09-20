import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    try {
      const response: any = await register( email, password, username);
      setMessage(response.message || 'Registration successful! You can now log in.');
      setIsError(false);

      setUsername('');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err: any) {
      setMessage(err.response.data.error);
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        {message && (
              <p className={`text-${isError ? 'red' : 'green'}-500`}>{message}</p>
            )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">UserName</Label>
            <Input
              id="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className="w-full">Sign Up</Button>
        </CardFooter>
        </form>
      </Card>
    </div>
  );
}
