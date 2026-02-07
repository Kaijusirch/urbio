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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { hearings, Hearing, drivers } from '@/data/mockData';
import { useState, useEffect } from 'react';
import { Gavel, Calendar, Clock, FileText, User, AlertTriangle, CheckCircle2, Plus, Pencil, Trash2 } from 'lucide-react';

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

type HearingForm = {
  driverId: string;
  driverLicense: string;
  scheduledDate: string;
  scheduledTime: string;
  allegation: string;
  regulationBreach: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'adjourned';
  outcome?: 'warning' | 'suspension' | 'revocation' | 'dismissed';
  documents: string;
};

const emptyForm: HearingForm = {
  driverId: '',
  driverLicense: '',
  scheduledDate: '',
  scheduledTime: '',
  allegation: '',
  regulationBreach: '',
  status: 'scheduled',
  outcome: undefined,
  documents: '',
};

export default function HearingsPage() {
  const [localHearings, setLocalHearings] = useState<Hearing[]>(hearings);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedHearing, setSelectedHearing] = useState<Hearing | null>(null);
  const [formData, setFormData] = useState<HearingForm>(emptyForm);

  // Auto-populate driver name from license number
  useEffect(() => {
    if (formData.driverLicense && !formData.driverId) {
      const foundDriver = drivers.find(d => d.licenseNumber === formData.driverLicense || d.authNumber === formData.driverLicense);
      if (foundDriver) {
        setFormData(prev => ({ ...prev, driverId: foundDriver.id }));
      }
    }
  }, [formData.driverLicense]);

  const upcomingHearings = localHearings.filter(h => h.status === 'scheduled' || h.status === 'in_progress');
  const completedHearings = localHearings.filter(h => h.status === 'completed' || h.status === 'adjourned');

  const handleAddHearing = () => {
    const selectedDriver = drivers.find(d => d.id === formData.driverId);
    if (!selectedDriver) {
      alert('Please select a valid driver');
      return;
    }
    const newHearing: Hearing = {
      id: `H${String(localHearings.length + 1).padStart(3, '0')}`,
      reference: `HRG-2026-${String(100 + localHearings.length).padStart(4, '0')}`,
      driverId: formData.driverId,
      driverName: selectedDriver.name,
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      allegation: formData.allegation,
      regulationBreach: formData.regulationBreach,
      status: formData.status,
      outcome: formData.outcome,
      documents: formData.documents.split(',').map(d => d.trim()).filter(d => d),
    };
    setLocalHearings([newHearing, ...localHearings]);
    setDialogOpen(false);
    setFormData(emptyForm);
  };

  const handleEditClick = (hearing: Hearing) => {
    setSelectedHearing(hearing);
    setFormData({
      driverId: hearing.driverId,
      driverLicense: '',
      scheduledDate: hearing.scheduledDate,
      scheduledTime: hearing.scheduledTime,
      allegation: hearing.allegation,
      regulationBreach: hearing.regulationBreach,
      status: hearing.status,
      outcome: hearing.outcome,
      documents: hearing.documents.join(', '),
    });
    setEditDialogOpen(true);
  };

  const handleUpdateHearing = () => {
    if (!selectedHearing) return;
    const selectedDriver = drivers.find(d => d.id === formData.driverId);
    setLocalHearings(localHearings.map(h =>
      h.id === selectedHearing.id
        ? {
            ...h,
            driverId: formData.driverId,
            driverName: selectedDriver?.name || h.driverName,
            scheduledDate: formData.scheduledDate,
            scheduledTime: formData.scheduledTime,
            allegation: formData.allegation,
            regulationBreach: formData.regulationBreach,
            status: formData.status,
            outcome: formData.outcome,
            documents: formData.documents.split(',').map(d => d.trim()).filter(d => d),
          }
        : h
    ));
    setEditDialogOpen(false);
    setSelectedHearing(null);
    setFormData(emptyForm);
  };

  const handleDeleteClick = (hearing: Hearing) => {
    setSelectedHearing(hearing);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedHearing) return;
    setLocalHearings(localHearings.filter(h => h.id !== selectedHearing.id));
    setDeleteDialogOpen(false);
    setSelectedHearing(null);
  };

  const HearingFormFields = () => (
    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
      <div className="space-y-2">
        <Label>Driver</Label>
        <Select value={formData.driverId} onValueChange={(v) => setFormData({ ...formData, driverId: v })}>
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
        <Label>Driver Licence Number (optional)</Label>
        <Input
          value={formData.driverLicense}
          onChange={(e) => setFormData({ ...formData, driverLicense: e.target.value })}
          placeholder="Enter licence to select driver"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Scheduled Date</Label>
          <Input
            value={formData.scheduledDate}
            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="space-y-2">
          <Label>Scheduled Time</Label>
          <Input
            value={formData.scheduledTime}
            onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
            placeholder="HH:MM"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Allegation</Label>
        <Input
          value={formData.allegation}
          onChange={(e) => setFormData({ ...formData, allegation: e.target.value })}
          placeholder="Brief allegation"
        />
      </div>
      <div className="space-y-2">
        <Label>Regulation Breach</Label>
        <Textarea
          value={formData.regulationBreach}
          onChange={(e) => setFormData({ ...formData, regulationBreach: e.target.value })}
          placeholder="Full details of regulation breach"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as typeof formData.status })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="adjourned">Adjourned</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Outcome (if completed)</Label>
          <Select value={formData.outcome || ''} onValueChange={(v) => setFormData({ ...formData, outcome: v as any || undefined })}>
            <SelectTrigger>
              <SelectValue placeholder="No outcome yet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No outcome</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="suspension">Suspension</SelectItem>
              <SelectItem value="revocation">Revocation</SelectItem>
              <SelectItem value="dismissed">Dismissed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Documents (comma separated)</Label>
        <Textarea
          value={formData.documents}
          onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
          placeholder="Document 1, Document 2, Document 3"
          className="h-20"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Disciplinary Hearings</h1>
          <p className="text-muted-foreground">{upcomingHearings.length} upcoming hearings</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Hearing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Disciplinary Hearing</DialogTitle>
              <DialogDescription>Create a new hearing record</DialogDescription>
            </DialogHeader>
            <HearingFormFields />
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddHearing}>Create Hearing</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{localHearings.filter(h => h.status === 'scheduled').length}</p>
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
                <p className="text-2xl font-bold">{localHearings.filter(h => h.status === 'in_progress').length}</p>
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
                <p className="text-2xl font-bold">{localHearings.filter(h => h.status === 'completed').length}</p>
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
                <p className="text-2xl font-bold">{localHearings.filter(h => h.outcome === 'suspension' || h.outcome === 'revocation').length}</p>
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
                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(hearing)}
                          className="gap-1"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(hearing)}
                          className="gap-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
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
                    <div className="space-y-2 flex-1">
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
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(hearing)}
                        className="gap-1"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(hearing)}
                        className="gap-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Hearing</DialogTitle>
            <DialogDescription>Update hearing information</DialogDescription>
          </DialogHeader>
          <HearingFormFields />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateHearing}>Update Hearing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Hearing</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this hearing? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
