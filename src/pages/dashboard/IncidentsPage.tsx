import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { incidents, Incident, drivers } from '@/data/mockData';
import { useState } from 'react';
import { Search, AlertTriangle, MapPin, Calendar, Clock, Car, User, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

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
  const [localIncidents, setLocalIncidents] = useState<Incident[]>(incidents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newIncident, setNewIncident] = useState({
    type: 'safety' as 'safety' | 'vehicle' | 'passenger' | 'environmental' | 'dispute',
    title: '',
    description: '',
    severity: 'medium' as 'critical' | 'high' | 'medium' | 'low',
    location: '',
    date: '',
    time: '',
    driverId: '',
    vehicleRego: '',
    followUpRequired: false,
  });

  const filteredIncidents = localIncidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || incident.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;
    
    return matchesSearch && matchesType && matchesSeverity;
  });

  const handleAddIncident = () => {
    const selectedDriver = drivers.find(d => d.id === newIncident.driverId);
    const incident: Incident = {
      id: `INC${String(localIncidents.length + 1).padStart(3, '0')}`,
      reference: `INC-2026-${String(157 + localIncidents.length).padStart(4, '0')}`,
      type: newIncident.type,
      title: newIncident.title,
      description: newIncident.description,
      severity: newIncident.severity,
      location: newIncident.location,
      date: newIncident.date,
      time: newIncident.time,
      driverId: newIncident.driverId || undefined,
      driverName: selectedDriver?.name,
      vehicleRego: newIncident.vehicleRego || undefined,
      status: 'reported',
      followUpRequired: newIncident.followUpRequired,
    };
    setLocalIncidents([incident, ...localIncidents]);
    setDialogOpen(false);
    setNewIncident({
      type: 'safety',
      title: '',
      description: '',
      severity: 'medium',
      location: '',
      date: '',
      time: '',
      driverId: '',
      vehicleRego: '',
      followUpRequired: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Incidents & Safety Reports</h1>
          <p className="text-muted-foreground">{localIncidents.filter(i => i.status !== 'closed').length} active incidents</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Report Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Report New Incident</DialogTitle>
              <DialogDescription>Enter details of the safety incident.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Incident Type</Label>
                  <Select value={newIncident.type} onValueChange={(v) => setNewIncident({...newIncident, type: v as typeof newIncident.type})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="passenger">Passenger</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="dispute">Dispute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select value={newIncident.severity} onValueChange={(v) => setNewIncident({...newIncident, severity: v as typeof newIncident.severity})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                  placeholder="Brief incident title"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                  placeholder="Detailed description of incident..."
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input 
                    value={newIncident.location}
                    onChange={(e) => setNewIncident({...newIncident, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input 
                    value={newIncident.date}
                    onChange={(e) => setNewIncident({...newIncident, date: e.target.value})}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input 
                    value={newIncident.time}
                    onChange={(e) => setNewIncident({...newIncident, time: e.target.value})}
                    placeholder="HH:MM"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Driver (optional)</Label>
                  <Select value={newIncident.driverId} onValueChange={(v) => setNewIncident({...newIncident, driverId: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map(d => (
                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Rego (optional)</Label>
                  <Input 
                    value={newIncident.vehicleRego}
                    onChange={(e) => setNewIncident({...newIncident, vehicleRego: e.target.value})}
                    placeholder="T12-345"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="followUp"
                  checked={newIncident.followUpRequired}
                  onChange={(e) => setNewIncident({...newIncident, followUpRequired: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="followUp">Follow-up Required</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddIncident}>Report Incident</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{localIncidents.filter(i => i.severity === 'critical').length}</p>
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
                <p className="text-2xl font-bold">{localIncidents.filter(i => i.status === 'investigating').length}</p>
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
                <p className="text-2xl font-bold">{localIncidents.filter(i => i.followUpRequired).length}</p>
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
                <p className="text-2xl font-bold">{localIncidents.filter(i => i.status === 'resolved' || i.status === 'closed').length}</p>
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
