import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  dashboardMetrics,
  activityFeed,
  drivers,
} from '@/data/mockData';
import {
  MessageSquareWarning,
  Car,
  DollarSign,
  Gavel,
  Activity,
  AlertTriangle,
  Package,
  Clock,
  Users,
  CheckCircle2,
} from 'lucide-react';

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
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Queensland Taxi Operations Overview</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.availableVehicles}</div>
            <p className="text-xs text-muted-foreground">
              of {dashboardMetrics.totalVehicles} total fleet
            </p>
          </CardContent>
        </Card>

        <Card>
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

        <Card>
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
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Feed */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityFeed.slice(0, 6).map((item) => {
                const Icon = typeIcons[item.type];
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
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

        {/* Autocab Status Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Autocab Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Connection Status */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/30">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse-dot" />
              <div>
                <p className="font-medium text-sm text-success">Connected</p>
                <p className="text-xs text-muted-foreground">Last sync: 2 seconds ago</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Drivers Online</span>
                </div>
                <span className="font-semibold">{dashboardMetrics.driversOnline}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">On Trip</span>
                </div>
                <span className="font-semibold">{dashboardMetrics.driversOnTrip}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Available</span>
                </div>
                <span className="font-semibold text-success">{dashboardMetrics.availableVehicles}</span>
              </div>
            </div>

            {/* Fleet Status Breakdown */}
            <div>
              <p className="text-sm font-medium mb-3">Fleet Status</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success"
                      style={{ width: `${(dashboardMetrics.availableVehicles / dashboardMetrics.totalVehicles) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-20">
                    Available ({dashboardMetrics.availableVehicles})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(dashboardMetrics.driversOnTrip / dashboardMetrics.totalVehicles) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-20">
                    On Trip ({dashboardMetrics.driversOnTrip})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-muted-foreground"
                      style={{ width: `${((dashboardMetrics.totalVehicles - dashboardMetrics.driversOnline) / dashboardMetrics.totalVehicles) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-20">
                    Off Duty ({dashboardMetrics.totalVehicles - dashboardMetrics.driversOnline})
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
