import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Car, Shield, Users, BarChart3 } from 'lucide-react';

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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('dispatch');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    const success = login(email, password, role);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Login failed. Please try again.');
    }
  };

  const handleDemoLogin = (selectedRole: UserRole) => {
    const demoEmails: Record<UserRole, string> = {
      dispatch: 'dispatch@qldtaxi.com.au',
      manager: 'manager@qldtaxi.com.au',
      compliance: 'compliance@qldtaxi.com.au',
    };
    setEmail(demoEmails[selectedRole]);
    setPassword('demo123');
    setRole(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-lg">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
            <Car className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Queensland Taxi CRM</h1>
          <p className="text-muted-foreground mt-2">Dispatch Management System</p>
        </div>

        <Card className="shadow-lg border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Select your role and enter credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Select Role</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) => {
                    setRole(value as UserRole);
                    handleDemoLogin(value as UserRole);
                  }}
                  className="grid gap-3"
                >
                  {roleOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <Label
                        key={option.value}
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          role === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={option.value} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-primary" />
                            <span className="font-medium">{option.label}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                        </div>
                      </Label>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Email & Password */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background"
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
                    className="bg-background"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/30">
              <p className="text-sm font-medium text-accent-foreground mb-2">Demo Credentials</p>
              <p className="text-xs text-muted-foreground">
                Select any role above to auto-fill demo credentials.
                <br />
                Password: <code className="bg-muted px-1 rounded">demo123</code>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Queensland Taxi CRM &copy; 2026 | AEST Timezone
        </p>
      </div>
    </div>
  );
}
