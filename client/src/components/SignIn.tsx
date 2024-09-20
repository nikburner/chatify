import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function SignIn() {
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
      
      const response: any = await login(email, password);
      alert(`Hello:, ${response.data.token}`)
      console.log("response", response)
      localStorage.setItem('token',response.data.token);
      setIsError(false);
      setMessage(response.data.msg)
      setEmail('');
      setPassword('');
      navigate('/chats');
    } catch (err: any) {
      console.log("err", err.response)
      setMessage(err.response.data.msg || 'Invalid credentials');
      setIsError(true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        {message && (
              <p className={`text-${isError ? 'red' : 'green'}-500`}>{message}</p>
            )}
          <div className="space-y-2">
            <Label htmlFor="email">email</Label>
            <Input
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Sign in</Button>
        </CardFooter>
        </form>
      </Card>
    </div>
  );
}
