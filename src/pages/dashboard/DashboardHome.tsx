import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  dashboardMetrics,
  activityFeed,
} from '@/data/mockData';
import {
  MessageSquareWarning,
  DollarSign,
  Gavel,
  Activity,
  AlertTriangle,
  Package,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const priorityColors = {
  critical: 'bg-destructive text-destructive-foreground',
  high: 'bg-warning text-warning-foreground',
  medium: 'bg-primary text-primary-foreground',
  low: 'bg-muted text-muted-foreground',
};

const typeIcons = {
  complaint: MessageSquareWarning,
  incident: AlertTriangle,
  lost_property: Package,
  fare_evasion: DollarSign,
  hearing: Gavel,
};

export default function DashboardHome() {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const activityTypeRoutes = {
    complaint: '/dashboard/complaints',
    incident: '/dashboard/incidents',
    lost_property: '/dashboard/lost-property',
    fare_evasion: '/dashboard/fare-evasions',
    hearing: '/dashboard/hearings',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Operations Overview</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card 
          className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50" 
          onClick={() => handleCardClick('/dashboard/complaints')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
            <MessageSquareWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.activeComplaints}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive font-medium">{dashboardMetrics.criticalComplaints} critical</span> requiring attention
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
          onClick={() => handleCardClick('/dashboard/fare-evasions')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Fare Evasions</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.openFareEvasions}</div>
            <p className="text-xs text-muted-foreground">
              ${dashboardMetrics.totalFareEvasionAmount.toFixed(2)} outstanding
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
          onClick={() => handleCardClick('/dashboard/hearings')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Hearings</CardTitle>
            <Gavel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.pendingHearings}</div>
            <p className="text-xs text-muted-foreground">
              scheduled this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {activityFeed.slice(0, 8).map((item) => {
              const Icon = typeIcons[item.type];
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all cursor-pointer hover:shadow-md"
                  onClick={() => handleCardClick(activityTypeRoutes[item.type])}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{item.title}</span>
                      {item.priority && (
                        <Badge className={`text-xs ${priorityColors[item.priority]}`}>
                          {item.priority}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
