import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Car,
  LayoutDashboard,
  Users,
  MessageSquareWarning,
  Package,
  DollarSign,
  AlertTriangle,
  Gavel,
  Activity,
} from 'lucide-react';

const mainNavItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard, roles: ['dispatch', 'manager', 'compliance'] },
  { title: 'Drivers', url: '/dashboard/drivers', icon: Users, roles: ['dispatch', 'manager', 'compliance'] },
  { title: 'Complaints', url: '/dashboard/complaints', icon: MessageSquareWarning, roles: ['dispatch', 'manager', 'compliance'] },
  { title: 'Lost Property', url: '/dashboard/lost-property', icon: Package, roles: ['dispatch', 'manager'] },
];

const operationsItems = [
  { title: 'Fare Evasions', url: '/dashboard/fare-evasions', icon: DollarSign, roles: ['dispatch', 'manager', 'compliance'] },
  { title: 'Incidents', url: '/dashboard/incidents', icon: AlertTriangle, roles: ['dispatch', 'manager', 'compliance'] },
];

const complianceItems = [
  { title: 'Hearings', url: '/dashboard/hearings', icon: Gavel, roles: ['manager', 'compliance'] },
];

export function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const filterByRole = (items: typeof mainNavItems) => {
    if (!user) return [];
    return items.filter(item => item.roles.includes(user.role));
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Car className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-sidebar-foreground text-sm">QLD Taxi</h2>
              <p className="text-xs text-sidebar-muted">CRM System</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByRole(mainNavItems).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted">Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterByRole(operationsItems).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {filterByRole(complianceItems).length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-muted">Compliance</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filterByRole(complianceItems).map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                    >
                      <NavLink to={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="flex items-center gap-2 text-xs text-sidebar-muted">
          <Activity className="w-3 h-3 animate-pulse-dot text-success" />
          <span>Autocab Connected</span>
        </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
