import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { drivers, Driver } from '@/data/mockData';
import { useState } from 'react';
import { Search, Phone, AlertCircle, CheckCircle2, Clock, Plus, Pencil, Trash2 } from 'lucide-react';

const accreditationColors = {
  current: 'bg-success/10 text-success border-success/30',
  expiring: 'bg-warning/10 text-warning border-warning/30',
  expired: 'bg-destructive/10 text-destructive border-destructive/30',
};

const accreditationLabels = {
  current: 'Current',
  expiring: 'Expiring Soon',
  expired: 'Expired',
};

type DriverForm = {
  name: string;
  licenseNumber: string;
  authNumber: string;
  phone: string;
  suburb: string;
  licenseExpiry: string;
  accreditationStatus: 'current' | 'expiring' | 'expired';
  accreditationExpiry: string;
};

const emptyDriverForm: DriverForm = {
  name: '',
  licenseNumber: '',
  authNumber: '',
  phone: '',
  suburb: '',
  licenseExpiry: '',
  accreditationStatus: 'current',
  accreditationExpiry: '',
};

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [localDrivers, setLocalDrivers] = useState<Driver[]>(drivers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState<DriverForm>(emptyDriverForm);

  const filteredDrivers = localDrivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.includes(searchTerm) ||
      driver.authNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.suburb.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDriver = () => {
    const driver: Driver = {
      id: `D${String(localDrivers.length + 1).padStart(3, '0')}`,
      name: formData.name,
      licenseNumber: formData.licenseNumber,
      authNumber: formData.authNumber,
      phone: formData.phone,
      suburb: formData.suburb,
      medicalExpiry: formData.licenseExpiry,
      accreditationStatus: formData.accreditationStatus,
      accreditationExpiry: formData.accreditationExpiry,
      status: 'available',
    };
    setLocalDrivers([driver, ...localDrivers]);
    setDialogOpen(false);
    setFormData(emptyDriverForm);
  };

  const handleEditClick = (driver: Driver) => {
    setSelectedDriver(driver);
    setFormData({
      name: driver.name,
      licenseNumber: driver.licenseNumber,
      authNumber: driver.authNumber,
      phone: driver.phone,
      suburb: driver.suburb,
      licenseExpiry: driver.medicalExpiry,
      accreditationStatus: driver.accreditationStatus,
      accreditationExpiry: driver.accreditationExpiry,
    });
    setEditDialogOpen(true);
  };

  const handleUpdateDriver = () => {
    if (!selectedDriver) return;
    setLocalDrivers(localDrivers.map(d => 
      d.id === selectedDriver.id 
        ? {
            ...d,
            name: formData.name,
            licenseNumber: formData.licenseNumber,
            authNumber: formData.authNumber,
            phone: formData.phone,
            suburb: formData.suburb,
            medicalExpiry: formData.licenseExpiry,
            accreditationStatus: formData.accreditationStatus,
            accreditationExpiry: formData.accreditationExpiry,
          }
        : d
    ));
    setEditDialogOpen(false);
    setSelectedDriver(null);
    setFormData(emptyDriverForm);
  };

  const handleDeleteClick = (driver: Driver) => {
    setSelectedDriver(driver);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedDriver) return;
    setLocalDrivers(localDrivers.filter(d => d.id !== selectedDriver.id));
    setDeleteDialogOpen(false);
    setSelectedDriver(null);
  };

  const DriverFormFields = () => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="04XX XXX XXX"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Driver License Number</Label>
          <Input 
            value={formData.licenseNumber}
            onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label>Licence Expiry</Label>
          <Input 
            value={formData.licenseExpiry}
            onChange={(e) => setFormData({...formData, licenseExpiry: e.target.value})}
            placeholder="DD/MM/YYYY"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Authorisation Number</Label>
          <Input 
            value={formData.authNumber}
            onChange={(e) => setFormData({...formData, authNumber: e.target.value})}
            placeholder="TDA-QLD-YYYY-XXXX"
          />
        </div>
        <div className="space-y-2">
          <Label>Suburb</Label>
          <Input 
            value={formData.suburb}
            onChange={(e) => setFormData({...formData, suburb: e.target.value})}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Accreditation Status</Label>
          <Select 
            value={formData.accreditationStatus}
            onValueChange={(v) => setFormData({...formData, accreditationStatus: v as 'current' | 'expiring' | 'expired'})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="expiring">Expiring Soon</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Accreditation Expiry</Label>
          <Input 
            value={formData.accreditationExpiry}
            onChange={(e) => setFormData({...formData, accreditationExpiry: e.target.value})}
            placeholder="DD/MM/YYYY"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Driver Management</h1>
          <p className="text-muted-foreground">{localDrivers.length} registered drivers</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setFormData(emptyDriverForm);
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Driver
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogDescription>Enter the driver's details below.</DialogDescription>
              </DialogHeader>
              <DriverFormFields />
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddDriver}>Add Driver</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{localDrivers.filter(d => d.accreditationStatus === 'current').length}</p>
                <p className="text-sm text-muted-foreground">Current Accreditation</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{localDrivers.filter(d => d.accreditationStatus === 'expiring').length}</p>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{localDrivers.filter(d => d.accreditationStatus === 'expired').length}</p>
                <p className="text-sm text-muted-foreground">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>License / Auth</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Accreditation</TableHead>
                  <TableHead>Licence Expiry</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-muted-foreground">{driver.suburb}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>DL: {driver.licenseNumber}</p>
                        <p className="text-muted-foreground">{driver.authNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {driver.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline" className={accreditationColors[driver.accreditationStatus]}>
                          {accreditationLabels[driver.accreditationStatus]}
                        </Badge>
                        <p className="text-xs text-muted-foreground">Exp: {driver.accreditationExpiry}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{driver.medicalExpiry}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(driver)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(driver)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredDrivers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No drivers found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={(open) => {
        setEditDialogOpen(open);
        if (!open) {
          setSelectedDriver(null);
          setFormData(emptyDriverForm);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Driver</DialogTitle>
            <DialogDescription>Update the driver's details below.</DialogDescription>
          </DialogHeader>
          <DriverFormFields />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateDriver}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Driver</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedDriver?.name}? This action cannot be undone.
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
