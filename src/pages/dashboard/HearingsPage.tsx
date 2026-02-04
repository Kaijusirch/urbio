import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { hearings } from '@/data/mockData';
import { Gavel, Calendar, Clock, FileText, User, AlertTriangle, CheckCircle2 } from 'lucide-react';

const statusColors = {
  scheduled: 'bg-primary/10 text-primary border-primary/30',
  in_progress: 'bg-warning/10 text-warning border-warning/30',
  completed: 'bg-success/10 text-success border-success/30',
  adjourned: 'bg-muted text-muted-foreground border-muted',
};

const statusLabels = {
  scheduled: 'Scheduled',
  in_progress: 'In Progress',
  completed: 'Completed',
  adjourned: 'Adjourned',
};

const outcomeColors = {
  warning: 'bg-warning/10 text-warning border-warning/30',
  suspension: 'bg-destructive/10 text-destructive border-destructive/30',
  revocation: 'bg-destructive text-destructive-foreground',
  dismissed: 'bg-success/10 text-success border-success/30',
};

export default function HearingsPage() {
  const upcomingHearings = hearings.filter(h => h.status === 'scheduled' || h.status === 'in_progress');
  const completedHearings = hearings.filter(h => h.status === 'completed' || h.status === 'adjourned');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Disciplinary Hearings</h1>
        <p className="text-muted-foreground">{upcomingHearings.length} upcoming hearings</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{hearings.filter(h => h.status === 'scheduled').length}</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Gavel className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{hearings.filter(h => h.status === 'in_progress').length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{hearings.filter(h => h.status === 'completed').length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{hearings.filter(h => h.outcome === 'suspension' || h.outcome === 'revocation').length}</p>
                <p className="text-sm text-muted-foreground">Suspensions/Revocations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Hearings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Hearings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingHearings.length > 0 ? (
            <div className="space-y-4">
              {upcomingHearings.map((hearing) => (
                <div
                  key={hearing.id}
                  className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-mono text-muted-foreground">{hearing.reference}</span>
                        <Badge variant="outline" className={statusColors[hearing.status]}>
                          {statusLabels[hearing.status]}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{hearing.driverName}</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Allegation</p>
                          <p className="font-medium">{hearing.allegation}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Regulation Breach</p>
                          <p className="text-sm">{hearing.regulationBreach}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{hearing.scheduledDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{hearing.scheduledTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 min-w-[200px]">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Required Documents</p>
                        <div className="space-y-1">
                          {hearing.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <FileText className="h-3 w-3 text-muted-foreground" />
                              <span>{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">No upcoming hearings scheduled.</p>
          )}
        </CardContent>
      </Card>

      {/* Completed Hearings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Recent Completed Hearings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completedHearings.length > 0 ? (
            <div className="space-y-4">
              {completedHearings.map((hearing) => (
                <div
                  key={hearing.id}
                  className="p-4 rounded-lg border bg-muted/30"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-mono text-muted-foreground">{hearing.reference}</span>
                        <Badge variant="outline" className={statusColors[hearing.status]}>
                          {statusLabels[hearing.status]}
                        </Badge>
                        {hearing.outcome && (
                          <Badge variant="outline" className={outcomeColors[hearing.outcome]}>
                            {hearing.outcome.charAt(0).toUpperCase() + hearing.outcome.slice(1)}
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium">{hearing.driverName}</p>
                      <p className="text-sm text-muted-foreground">{hearing.allegation}</p>
                    </div>
                    <div className="text-sm text-right">
                      <p className="text-muted-foreground">Hearing Date</p>
                      <p className="font-medium">{hearing.scheduledDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-muted-foreground">No completed hearings.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
