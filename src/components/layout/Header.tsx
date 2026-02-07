import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useQldTime } from '@/hooks/useQldTime';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LogOut, Clock, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import urbioLogo from '@/assets/urbio-logo.png';

const roleLabels = {
  dispatch: 'Dispatch Operator',
  manager: 'Manager',
  compliance: 'Compliance Officer',
};

const roleBadgeColors = {
  dispatch: 'bg-primary text-primary-foreground',
  manager: 'bg-accent text-accent-foreground',
  compliance: 'bg-secondary text-secondary-foreground',
};

export function Header() {
  const { user, logout } = useAuth();
  const { time, date } = useQldTime();
  const navigate = useNavigate();
  const { state } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        <div className="hidden sm:flex items-center gap-3">
          <img 
            src={urbioLogo} 
            alt="Urbio Logo" 
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col">
            <h1 className="font-semibold text-foreground leading-tight">URBIO</h1>
            <p className="text-xs text-muted-foreground">by Chris Balsom</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Queensland Time */}
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{date}</span>
          <span className="font-mono">{time}</span>
          <span className="text-xs">AEST</span>
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{user.name}</p>
              <Badge className={`text-xs ${roleBadgeColors[user.role]}`}>
                {roleLabels[user.role]}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
