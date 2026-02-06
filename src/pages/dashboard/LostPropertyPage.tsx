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
import { lostProperty, LostProperty } from '@/data/mockData';
import { useState } from 'react';
import { Search, Package, Phone, MapPin, Calendar, Clock, Plus, DollarSign, Navigation, Pencil, Trash2 } from 'lucide-react';

const statusColors = {
  unclaimed: 'bg-warning/10 text-warning border-warning/30',
  contacted: 'bg-primary/10 text-primary border-primary/30',
  claimed: 'bg-success/10 text-success border-success/30',
  disposed: 'bg-muted text-muted-foreground border-muted',
};

const statusLabels = {
  unclaimed: 'Unclaimed',
  contacted: 'Contacted',
  claimed: 'Claimed',
  disposed: 'Disposed',
};

type LostPropertyForm = {
  item: string;
  description: string;
  vehicleRego: string;
  driverName: string;
  foundLocation: string;
  foundDate: string;
  status: 'unclaimed' | 'contacted' | 'claimed' | 'disposed';
  passengerPhone: string;
  tripPickup: string;
  tripDropoff: string;
  tripFare: string;
  tripDate: string;
  tripTime: string;
};

const emptyForm: LostPropertyForm = {
  item: '',
  description: '',
  vehicleRego: '',
  driverName: '',
  foundLocation: '',
  foundDate: '',
  status: 'unclaimed',
  passengerPhone: '',
  tripPickup: '',
  tripDropoff: '',
  tripFare: '',
  tripDate: '',
  tripTime: '',
};

export default function LostPropertyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [localItems, setLocalItems] = useState<LostProperty[]>(lostProperty);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LostProperty | null>(null);
  const [formData, setFormData] = useState<LostPropertyForm>(emptyForm);

  const filteredItems = localItems.filter(
    (item) =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vehicleRego.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.foundLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    const item: LostProperty = {
      id: `LP${String(localItems.length + 1).padStart(3, '0')}`,
      reference: `LST-2026-${String(90 + localItems.length).padStart(4, '0')}`,
      item: formData.item,
      description: formData.description,
      vehicleRego: formData.vehicleRego,
      driverName: formData.driverName,
      foundLocation: formData.foundLocation,
      foundDate: formData.foundDate,
      status: formData.status,
      claimDeadline: formData.foundDate,
      contactAttempts: 0,
      passengerPhone: formData.passengerPhone || undefined,
      tripDetails: formData.tripPickup ? {
        pickup: formData.tripPickup,
        dropoff: formData.tripDropoff,
        fare: parseFloat(formData.tripFare) || 0,
        date: formData.tripDate,
        time: formData.tripTime,
      } : undefined,
    };
    setLocalItems([item, ...localItems]);
    setDialogOpen(false);
    setFormData(emptyForm);
  };

  const handleEditClick = (item: LostProperty) => {
    setSelectedItem(item);
    setFormData({
      item: item.item,
      description: item.description,
      vehicleRego: item.vehicleRego,
      driverName: item.driverName,
      foundLocation: item.foundLocation,
      foundDate: item.foundDate,
      status: item.status,
      passengerPhone: item.passengerPhone || '',
      tripPickup: item.tripDetails?.pickup || '',
      tripDropoff: item.tripDetails?.dropoff || '',
      tripFare: item.tripDetails?.fare?.toString() || '',
      tripDate: item.tripDetails?.date || '',
      tripTime: item.tripDetails?.time || '',
    });
    setEditDialogOpen(true);
  };

  const handleUpdateItem = () => {
    if (!selectedItem) return;
    setLocalItems(localItems.map(i => 
      i.id === selectedItem.id 
        ? {
            ...i,
            item: formData.item,
            description: formData.description,
            vehicleRego: formData.vehicleRego,
            driverName: formData.driverName,
            foundLocation: formData.foundLocation,
            foundDate: formData.foundDate,
            status: formData.status,
            passengerPhone: formData.passengerPhone || undefined,
            tripDetails: formData.tripPickup ? {
              pickup: formData.tripPickup,
              dropoff: formData.tripDropoff,
              fare: parseFloat(formData.tripFare) || 0,
              date: formData.tripDate,
              time: formData.tripTime,
            } : undefined,
          }
        : i
    ));
    setEditDialogOpen(false);
    setSelectedItem(null);
    setFormData(emptyForm);
  };

  const handleDeleteClick = (item: LostProperty) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedItem) return;
    setLocalItems(localItems.filter(i => i.id !== selectedItem.id));
    setDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const LostPropertyFormFields = ({ showStatus = false }: { showStatus?: boolean }) => (
    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Item Name</Label>
          <Input 
            value={formData.item}
            onChange={(e) => setFormData({...formData, item: e.target.value})}
            placeholder="e.g., iPhone 15"
          />
        </div>
        <div className="space-y-2">
          <Label>Found Date</Label>
          <Input 
            value={formData.foundDate}
            onChange={(e) => setFormData({...formData, foundDate: e.target.value})}
            placeholder="DD/MM/YYYY"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Detailed description of item..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Vehicle Rego</Label>
          <Input 
            value={formData.vehicleRego}
            onChange={(e) => setFormData({...formData, vehicleRego: e.target.value})}
            placeholder="T12-345"
          />
        </div>
        <div className="space-y-2">
          <Label>Driver Name</Label>
          <Input 
            value={formData.driverName}
            onChange={(e) => setFormData({...formData, driverName: e.target.value})}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Found Location</Label>
          <Input 
            value={formData.foundLocation}
            onChange={(e) => setFormData({...formData, foundLocation: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label>Passenger Phone (optional)</Label>
          <Input 
            value={formData.passengerPhone}
            onChange={(e) => setFormData({...formData, passengerPhone: e.target.value})}
            placeholder="04XX XXX XXX"
          />
        </div>
      </div>
      {showStatus && (
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v as typeof formData.status})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unclaimed">Unclaimed</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="claimed">Claimed</SelectItem>
              <SelectItem value="disposed">Disposed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      {/* Trip Details Section */}
      <div className="pt-4 border-t">
        <h4 className="font-medium mb-3">Trip Details (optional)</h4>
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
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Fare ($)</Label>
            <Input 
              value={formData.tripFare}
              onChange={(e) => setFormData({...formData, tripFare: e.target.value})}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label>Trip Date</Label>
            <Input 
              value={formData.tripDate}
              onChange={(e) => setFormData({...formData, tripDate: e.target.value})}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="space-y-2">
            <Label>Trip Time</Label>
            <Input 
              value={formData.tripTime}
              onChange={(e) => setFormData({...formData, tripTime: e.target.value})}
              placeholder="HH:MM"
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
          <h1 className="text-2xl font-bold text-foreground">Lost Property Registry</h1>
          <p className="text-muted-foreground">{localItems.filter(lp => lp.status !== 'claimed' && lp.status !== 'disposed').length} items pending</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
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
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Report Lost Property</DialogTitle>
                <DialogDescription>Enter details of the found item.</DialogDescription>
              </DialogHeader>
              <LostPropertyFormFields />
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddItem}>Add Item</Button>
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
              <Package className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{localItems.filter(lp => lp.status === 'unclaimed').length}</p>
                <p className="text-sm text-muted-foreground">Unclaimed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Phone className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{localItems.filter(lp => lp.status === 'contacted').length}</p>
                <p className="text-sm text-muted-foreground">Contacted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{localItems.filter(lp => lp.status === 'claimed').length}</p>
                <p className="text-sm text-muted-foreground">Claimed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{localItems.filter(lp => lp.status === 'disposed').length}</p>
                <p className="text-sm text-muted-foreground">Disposed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-mono text-muted-foreground">{item.reference}</span>
                      <Badge variant="outline" className={statusColors[item.status]}>
                        {statusLabels[item.status]}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg">{item.item}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{item.foundLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{item.foundDate}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Vehicle: </span>
                        <span className="font-mono">{item.vehicleRego}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Driver: </span>
                        <span>{item.driverName}</span>
                      </div>
                    </div>

                    {/* Trip Details */}
                    {item.tripDetails && (
                      <div className="mt-3 p-3 rounded-lg bg-muted/50 border">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Navigation className="h-4 w-4 text-primary" />
                          Trip Details
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Pickup: </span>
                            <span>{item.tripDetails.pickup}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Dropoff: </span>
                            <span>{item.tripDetails.dropoff}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            <span>${item.tripDetails.fare.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{item.tripDetails.date} {item.tripDetails.time}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:text-right space-y-2">
                    <div className="flex lg:justify-end gap-1 mb-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditClick(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(item)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Claim Deadline</p>
                      <p className="font-medium">{item.claimDeadline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Attempts</p>
                      <p className="font-medium">{item.contactAttempts}</p>
                    </div>
                    {item.passengerPhone && (
                      <div className="flex items-center gap-1 lg:justify-end text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{item.passengerPhone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No items found matching your search.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={(open) => {
        setEditDialogOpen(open);
        if (!open) {
          setSelectedItem(null);
          setFormData(emptyForm);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Lost Property</DialogTitle>
            <DialogDescription>Update the item details below.</DialogDescription>
          </DialogHeader>
          <LostPropertyFormFields showStatus />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateItem}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedItem?.item}"? This action cannot be undone.
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
