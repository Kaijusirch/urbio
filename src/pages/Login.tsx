import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield, Users, BarChart3, KeyRound } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import urbioLogo from '@/assets/urbio-logo.png';

const roleOptions: { value: UserRole; label: string; description: string; icon: React.ElementType }[] = [
  {
    value: 'dispatch',
    label: 'Dispatch Operator',
    description: 'Manage daily operations, complaints, and driver coordination',
    icon: Users,
  },
  {
    value: 'manager',
    label: 'Manager',
    description: 'Full access with reporting and oversight capabilities',
    icon: BarChart3,
  },
  {
    value: 'compliance',
    label: 'Compliance Officer',
    description: 'Focus on regulatory compliance and disciplinary matters',
    icon: Shield,
  },
];

const demoCredentials: Record<UserRole, { email: string; password: string }> = {
  dispatch: { email: 'dispatch@urbio.com.au', password: 'demo123' },
  manager: { email: 'manager@urbio.com.au', password: 'demo123' },
  compliance: { email: 'compliance@urbio.com.au', password: 'demo123' },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('dispatch');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [otpValue, setOtpValue] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    // Move to 2FA step
    setStep('2fa');
    setOtpValue('');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate 2FA - accept any 6 digit code
    if (otpValue.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    const success = login(email, password, role);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Login failed. Please try again.');
      setStep('credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 lg:p-8">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8 items-center">
        {/* Logo Header */}
        <div className="flex-1 text-center lg:text-left">
          <img 
            src={urbioLogo} 
            alt="Urbio Logo" 
            className="w-82 h-82 mx-auto lg:mx-0 object-contain mb-4"
          />
          {/* Demo Credentials */}
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 text-left">
            <p className="text-sm font-medium text-accent-foreground mb-3">Demo Credentials</p>
            <div className="space-y-2 text-sm">
              {roleOptions.map((option) => (
                <div key={option.value} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{option.label}:</span>
                  <code className="bg-muted px-2 py-0.5 rounded text-xs">{demoCredentials[option.value].email}</code>
                </div>
              ))}
              <div className="pt-2 border-t">
                <span className="text-muted-foreground">Password: </span>
                <code className="bg-muted px-2 py-0.5 rounded text-xs">demo123</code>
              </div>
              <div>
                <span className="text-muted-foreground">2FA Code: </span>
                <code className="bg-muted px-2 py-0.5 rounded text-xs">any 6 digits</code>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-primary/20 w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {step === 'credentials' ? 'Sign In' : 'Two-Factor Authentication'}
            </CardTitle>
            <CardDescription>
              {step === 'credentials' 
                ? 'Select your role and enter credentials' 
                : 'Enter the 6-digit code from your authenticator'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'credentials' ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Role</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={(value) => setRole(value as UserRole)}
                    className="grid gap-2"
                  >
                    {roleOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <Label
                          key={option.value}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            role === option.value
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <RadioGroupItem value={option.value} />
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm">{option.label}</span>
                        </Label>
                      );
                    })}
                  </RadioGroup>
                </div>

                {/* Email & Password */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}

                <Button type="submit" className="w-full" size="lg">
                  Continue
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <KeyRound className="w-6 h-6 text-primary" />
                  </div>
                  <InputOTP 
                    maxLength={6} 
                    value={otpValue} 
                    onChange={setOtpValue}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <p className="text-xs text-muted-foreground text-center">
                    For demo, enter any 6 digits (e.g., 123456)
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}

                <div className="space-y-2">
                  <Button type="submit" className="w-full" size="lg">
                    Verify & Sign In
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full" 
                    onClick={() => {
                      setStep('credentials');
                      setError('');
                    }}
                  >
                    Back to Login
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
