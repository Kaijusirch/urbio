import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { hearings as seedHearings, Hearing, drivers } from '@/data/mockData';
import { Gavel, Calendar, Clock, FileText, User, AlertTriangle, CheckCircle2, Pencil } from 'lucide-react';

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

// Edit Hearing form model using safe non-empty Select values
type OutcomeOption = 'none' | 'warning' | 'suspension' | 'revocation' | 'dismissed';

type HearingForm = {
  driverId: string;
  scheduledDate: string;
  scheduledTime: string;
  allegation: string;
  regulationBreach: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'adjourned';
  outcome: OutcomeOption; // 'none' sentinel represents undefined
  documentsText: string; // newline separated for simple editing
};

const toForm = (h: Hearing): HearingForm => ({
  driverId: h.driverId,
  scheduledDate: h.scheduledDate,
  scheduledTime: h.scheduledTime,
  allegation: h.allegation,
  regulationBreach: h.regulationBreach,
  status: h.status,
  outcome: (h.outcome ?? 'none') as OutcomeOption,
  documentsText: h.documents.join('\n'),
});

const fromForm = (id: string, ref: string, form: HearingForm, prev: Hearing): Hearing => ({
  id,
  reference: ref,
  driverId: form.driverId,
  driverName: drivers.find(d => d.id === form.driverId)?.name || prev.driverName,
  scheduledDate: form.scheduledDate,
  scheduledTime: form.scheduledTime,
  allegation: form.allegation,
  regulationBreach: form.regulationBreach,
  status: form.status,
  outcome: form.outcome === 'none' ? undefined : (form.outcome as Exclude<OutcomeOption, 'none'>),
  documents: form.documentsText
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean),
});

export default function HearingsPage() {
  const [localHearings, setLocalHearings] = useState<Hearing[]>(seedHearings);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Hearing | null>(null);
  const [form, setForm] = useState<HearingForm | null>(null);

  const upcomingHearings = localHearings.filter(h => h.status === 'scheduled' || h.status === 'in_progress');
  const completedHearings = localHearings.filter(h => h.status === 'completed' || h.status === 'adjourned');

  const handleEdit = (h: Hearing) => {
    setSelected(h);
    setForm(toForm(h));
    setEditOpen(true);
  };

  const handleSave = () => {
    if (!selected || !form) return;
    const updated = fromForm(selected.id, selected.reference, form, selected);
    setLocalHearings(prev => prev.map(h => (h.id === selected.id ? updated : h)));
    setEditOpen(false);
    setSelected(null);
    setForm(null);
  };

  const closeDialog = (open: boolean) => {
    setEditOpen(open);
    if (!open) {
      setSelected(null);
      setForm(null);
    }
  };

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

                    <div className="space-y-3 min-w-[220px]">
                      <div className="flex justify-end">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(hearing)} title="Edit hearing">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
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
                      <div className="flex justify-end mb-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(hearing)} title="Edit hearing">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
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

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Hearing</DialogTitle>
            <DialogDescription>Update the hearing details below.</DialogDescription>
          </DialogHeader>

          {form && (
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Driver</Label>
                  <Select value={form.driverId} onValueChange={(v) => setForm({ ...form, driverId: v })}>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input value={form.scheduledDate} onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })} placeholder="DD/MM/YYYY" />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input value={form.scheduledTime} onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })} placeholder="HH:MM" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as HearingForm['status'] })}>
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
                  <Label>Outcome</Label>
                  <Select value={form.outcome} onValueChange={(v) => setForm({ ...form, outcome: v as OutcomeOption })}>
                    <SelectTrigger>
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="suspension">Suspension</SelectItem>
                      <SelectItem value="revocation">Revocation</SelectItem>
                      <SelectItem value="dismissed">Dismissed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Allegation</Label>
                <Input value={form.allegation} onChange={(e) => setForm({ ...form, allegation: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Regulation Breach</Label>
                <Input value={form.regulationBreach} onChange={(e) => setForm({ ...form, regulationBreach: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Required Documents (one per line)</Label>
                <Textarea value={form.documentsText} onChange={(e) => setForm({ ...form, documentsText: e.target.value })} placeholder={"Complaint form\nDriver statement\n..."} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => closeDialog(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
