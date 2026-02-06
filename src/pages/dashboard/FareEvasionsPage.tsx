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
import { fareEvasions, FareEvasion, drivers } from '@/data/mockData';
import { useState } from 'react';
import { Search, DollarSign, MapPin, Calendar, Clock, User, FileText, Plus, Navigation, Pencil, Trash2 } from 'lucide-react';

const statusColors = {
  open: 'bg-destructive/10 text-destructive border-destructive/30',
  investigating: 'bg-warning/10 text-warning border-warning/30',
  recovered: 'bg-success/10 text-success border-success/30',
  written_off: 'bg-muted text-muted-foreground border-muted',
};

const statusLabels = {
  open: 'Open',
  investigating: 'Investigating',
  recovered: 'Recovered',
  written_off: 'Written Off',
};

type FareEvasionForm = {
  amount: string;
  suburb: string;
  description: string;
  passengerDescription: string;
  date: string;
  time: string;
  driverId: string;
  vehicleRego: string;
  policeReport: string;
  tripPickup: string;
  tripDropoff: string;
  status: 'open' | 'investigating' | 'recovered' | 'written_off';
};

const emptyForm: FareEvasionForm = {
  amount: '',
  suburb: '',
  description: '',
  passengerDescription: '',
  date: '',
  time: '',
  driverId: '',
  vehicleRego: '',
  policeReport: '',
  tripPickup: '',
  tripDropoff: '',
  status: 'open',
};

export default function FareEvasionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [localCases, setLocalCases] = useState<FareEvasion[]>(fareEvasions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<FareEvasion | null>(null);
  const [formData, setFormData] = useState<FareEvasionForm>(emptyForm);

  const filteredCases = localCases.filter(
    (item) =>
      item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.suburb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vehicleRego.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOutstanding = localCases
    .filter(fe => fe.status === 'open' || fe.status === 'investigating')
    .reduce((sum, fe) => sum + fe.amount, 0);

  const handleAddCase = () => {
    const selectedDriver = drivers.find(d => d.id === formData.driverId);
    const newFareEvasion: FareEvasion = {
      id: `FE${String(localCases.length + 1).padStart(3, '0')}`,
      reference: `EVD-2026-${String(35 + localCases.length).padStart(4, '0')}`,
      amount: parseFloat(formData.amount) || 0,
      suburb: formData.suburb,
      description: formData.description,
      passengerDescription: formData.passengerDescription,
      date: formData.date,
      time: formData.time,
      driverId: formData.driverId,
      driverName: selectedDriver?.name || 'Unknown',
      vehicleRego: formData.vehicleRego,
      status: 'open',
      policeReport: formData.policeReport || undefined,
      tripDetails: formData.tripPickup ? {
        pickup: formData.tripPickup,
        dropoff: formData.tripDropoff,
      } : undefined,
    };
    setLocalCases([newFareEvasion, ...localCases]);
    setDialogOpen(false);
    setFormData(emptyForm);
  };

  const handleEditClick = (evasion: FareEvasion) => {
    setSelectedCase(evasion);
    setFormData({
      amount: evasion.amount.toString(),
      suburb: evasion.suburb,
      description: evasion.description,
      passengerDescription: evasion.passengerDescription,
      date: evasion.date,
      time: evasion.time,
      driverId: evasion.driverId,
      vehicleRego: evasion.vehicleRego,
      policeReport: evasion.policeReport || '',
      tripPickup: evasion.tripDetails?.pickup || '',
      tripDropoff: evasion.tripDetails?.dropoff || '',
      status: evasion.status,
    });
    setEditDialogOpen(true);
  };

  const handleUpdateCase = () => {
    if (!selectedCase) return;
    const selectedDriver = drivers.find(d => d.id === formData.driverId);
    setLocalCases(localCases.map(c => 
      c.id === selectedCase.id 
        ? {
            ...c,
            amount: parseFloat(formData.amount) || 0,
            suburb: formData.suburb,
            description: formData.description,
            passengerDescription: formData.passengerDescription,
            date: formData.date,
            time: formData.time,
            driverId: formData.driverId,
            driverName: selectedDriver?.name || c.driverName,
            vehicleRego: formData.vehicleRego,
            status: formData.status,
            policeReport: formData.policeReport || undefined,
            tripDetails: formData.tripPickup ? {
              pickup: formData.tripPickup,
              dropoff: formData.tripDropoff,
            } : undefined,
          }
        : c
    ));
    setEditDialogOpen(false);
    setSelectedCase(null);
    setFormData(emptyForm);
  };

  const handleDeleteClick = (evasion: FareEvasion) => {
    setSelectedCase(evasion);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedCase) return;
    setLocalCases(localCases.filter(c => c.id !== selectedCase.id));
    setDeleteDialogOpen(false);
    setSelectedCase(null);
  };

  const FareEvasionFormFields = ({ showStatus = false }: { showStatus?: boolean }) => (
    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Amount ($)</Label>
          <Input 
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <Label>Date</Label>
          <Input 
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="space-y-2">
          <Label>Time</Label>
          <Input 
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            placeholder="HH:MM"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Suburb</Label>
          <Input 
            value={formData.suburb}
            onChange={(e) => setFormData({...formData, suburb: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label>Vehicle Rego</Label>
          <Input 
            value={formData.vehicleRego}
            onChange={(e) => setFormData({...formData, vehicleRego: e.target.value})}
            placeholder="T12-345"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Driver</Label>
          <Select value={formData.driverId} onValueChange={(v) => setFormData({...formData, driverId: v})}>
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
        {showStatus && (
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v as typeof formData.status})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="recovered">Recovered</SelectItem>
                <SelectItem value="written_off">Written Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label>Incident Description</Label>
        <Textarea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Describe what happened..."
        />
      </div>
      <div className="space-y-2">
        <Label>Passenger Description</Label>
        <Textarea 
          value={formData.passengerDescription}
          onChange={(e) => setFormData({...formData, passengerDescription: e.target.value})}
          placeholder="Physical description of passenger(s)..."
        />
      </div>
      <div className="space-y-2">
        <Label>Police Report (optional)</Label>
        <Input 
          value={formData.policeReport}
          onChange={(e) => setFormData({...formData, policeReport: e.target.value})}
          placeholder="QP2026-XXXXXXX"
        />
      </div>
      
      {/* Trip Details Section */}
      <div className="pt-4 border-t">
        <h4 className="font-medium mb-3">Trip Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Pickup Location</Label>
            <Input 
              value={formData.tripPickup}
              onChange={(e) => setFormData({...formData, tripPickup: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Dropoff Location</Label>
            <Input 
              value={formData.tripDropoff}
              onChange={(e) => setFormData({...formData, tripDropoff: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fare Evasions</h1>
          <p className="text-muted-foreground">${totalOutstanding.toFixed(2)} outstanding</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setFormData(emptyForm);
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Report Case
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Report Fare Evasion</DialogTitle>
                <DialogDescription>Enter details of the fare evasion incident.</DialogDescription>
              </DialogHeader>
              <FareEvasionFormFields />
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddCase}>Report Case</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{localCases.filter(fe => fe.status === 'open').length}</p>
                <p className="text-sm text-muted-foreground">Open Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{localCases.filter(fe => fe.status === 'investigating').length}</p>
                <p className="text-sm text-muted-foreground">Investigating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{localCases.filter(fe => fe.status === 'recovered').length}</p>
                <p className="text-sm text-muted-foreground">Recovered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">${totalOutstanding.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Outstanding</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((evasion) => (
          <Card key={evasion.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-mono text-muted-foreground">{evasion.reference}</span>
                    <Badge variant="outline" className={statusColors[evasion.status]}>
                      {statusLabels[evasion.status]}
                    </Badge>
                    <Badge className="bg-destructive text-destructive-foreground">
                      ${evasion.amount.toFixed(2)}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground">{evasion.description}</p>

                  <div className="p-3 rounded-lg bg-muted/50 border">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Passenger Description</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{evasion.passengerDescription}</p>
                  </div>

                  {/* Trip Details */}
                  {evasion.tripDetails && (
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <Navigation className="h-4 w-4 text-primary" />
                        <span className="font-medium">Trip Details</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Pickup: </span>
                          <span>{evasion.tripDetails.pickup}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Dropoff: </span>
                          <span>{evasion.tripDetails.dropoff}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{evasion.suburb}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{evasion.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{evasion.time}</span>
                    </div>
                    {evasion.policeReport && (
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-xs">{evasion.policeReport}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:text-right space-y-2 min-w-[160px]">
                  <div className="flex lg:justify-end gap-1 mb-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(evasion)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(evasion)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Driver</p>
                    <p className="font-medium">{evasion.driverName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-mono font-medium">{evasion.vehicleRego}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCases.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No cases found matching your search.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={(open) => {
        setEditDialogOpen(open);
        if (!open) {
          setSelectedCase(null);
          setFormData(emptyForm);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Fare Evasion</DialogTitle>
            <DialogDescription>Update the case details below.</DialogDescription>
          </DialogHeader>
          <FareEvasionFormFields showStatus />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateCase}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Case</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete case {selectedCase?.reference}? This action cannot be undone.
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
