import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { incidents } from '@/data/mockData';
import { useState } from 'react';
import { Search, AlertTriangle, MapPin, Calendar, Clock, Car, User, CheckCircle2, AlertCircle } from 'lucide-react';

const severityColors = {
  critical: 'bg-destructive text-destructive-foreground',
  high: 'bg-warning text-warning-foreground',
  medium: 'bg-primary text-primary-foreground',
  low: 'bg-muted text-muted-foreground',
};

const statusColors = {
  reported: 'bg-destructive/10 text-destructive border-destructive/30',
  investigating: 'bg-warning/10 text-warning border-warning/30',
  resolved: 'bg-success/10 text-success border-success/30',
  closed: 'bg-muted text-muted-foreground border-muted',
};

const statusLabels = {
  reported: 'Reported',
  investigating: 'Investigating',
  resolved: 'Resolved',
  closed: 'Closed',
};

const typeLabels = {
  safety: 'Safety',
  vehicle: 'Vehicle',
  passenger: 'Passenger',
  environmental: 'Environmental',
  dispute: 'Dispute',
};

const typeIcons = {
  safety: AlertTriangle,
  vehicle: Car,
  passenger: User,
  environmental: AlertCircle,
  dispute: AlertTriangle,
};

export default function IncidentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || incident.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Incidents & Safety Reports</h1>
        <p className="text-muted-foreground">{incidents.filter(i => i.status !== 'closed').length} active incidents</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{incidents.filter(i => i.severity === 'critical').length}</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{incidents.filter(i => i.status === 'investigating').length}</p>
                <p className="text-sm text-muted-foreground">Investigating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{incidents.filter(i => i.followUpRequired).length}</p>
                <p className="text-sm text-muted-foreground">Follow-up Required</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{incidents.filter(i => i.status === 'resolved' || i.status === 'closed').length}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="vehicle">Vehicle</SelectItem>
                <SelectItem value="passenger">Passenger</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="dispute">Dispute</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => {
          const TypeIcon = typeIcons[incident.type];
          return (
            <Card key={incident.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-mono text-muted-foreground">{incident.reference}</span>
                      <Badge className={severityColors[incident.severity]}>
                        {incident.severity}
                      </Badge>
                      <Badge variant="outline" className={statusColors[incident.status]}>
                        {statusLabels[incident.status]}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <TypeIcon className="h-3 w-3" />
                        {typeLabels[incident.type]}
                      </Badge>
                      {incident.followUpRequired && (
                        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                          Follow-up Required
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-lg">{incident.title}</h3>
                    <p className="text-muted-foreground">{incident.description}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{incident.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{incident.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{incident.time}</span>
                      </div>
                    </div>
                  </div>

                  {(incident.driverName || incident.vehicleRego) && (
                    <div className="lg:text-right space-y-2 min-w-[160px]">
                      {incident.driverName && (
                        <div>
                          <p className="text-sm text-muted-foreground">Driver</p>
                          <p className="font-medium">{incident.driverName}</p>
                        </div>
                      )}
                      {incident.vehicleRego && (
                        <div>
                          <p className="text-sm text-muted-foreground">Vehicle</p>
                          <p className="font-mono font-medium">{incident.vehicleRego}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredIncidents.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No incidents found matching your filters.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
