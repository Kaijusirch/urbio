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
import { Search, Phone, AlertCircle, CheckCircle2, Clock, Plus } from 'lucide-react';

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

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [localDrivers, setLocalDrivers] = useState<Driver[]>(drivers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '',
    licenseNumber: '',
    authNumber: '',
    phone: '',
    suburb: '',
    licenseExpiry: '',
    accreditationStatus: 'current' as 'current' | 'expiring' | 'expired',
    accreditationExpiry: '',
  });

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
      name: newDriver.name,
      licenseNumber: newDriver.licenseNumber,
      authNumber: newDriver.authNumber,
      phone: newDriver.phone,
      suburb: newDriver.suburb,
      medicalExpiry: newDriver.licenseExpiry,
      accreditationStatus: newDriver.accreditationStatus,
      accreditationExpiry: newDriver.accreditationExpiry,
      status: 'available',
    };
    setLocalDrivers([driver, ...localDrivers]);
    setDialogOpen(false);
    setNewDriver({
      name: '',
      licenseNumber: '',
      authNumber: '',
      phone: '',
      suburb: '',
      licenseExpiry: '',
      accreditationStatus: 'current',
      accreditationExpiry: '',
    });
  };

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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      value={newDriver.name}
                      onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      value={newDriver.phone}
                      onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                      placeholder="04XX XXX XXX"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Driver License Number</Label>
                    <Input 
                      value={newDriver.licenseNumber}
                      onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Licence Expiry</Label>
                    <Input 
                      value={newDriver.licenseExpiry}
                      onChange={(e) => setNewDriver({...newDriver, licenseExpiry: e.target.value})}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Authorisation Number</Label>
                    <Input 
                      value={newDriver.authNumber}
                      onChange={(e) => setNewDriver({...newDriver, authNumber: e.target.value})}
                      placeholder="TDA-QLD-YYYY-XXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Suburb</Label>
                    <Input 
                      value={newDriver.suburb}
                      onChange={(e) => setNewDriver({...newDriver, suburb: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Accreditation Status</Label>
                    <Select 
                      value={newDriver.accreditationStatus}
                      onValueChange={(v) => setNewDriver({...newDriver, accreditationStatus: v as 'current' | 'expiring' | 'expired'})}
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
                      value={newDriver.accreditationExpiry}
                      onChange={(e) => setNewDriver({...newDriver, accreditationExpiry: e.target.value})}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>
              </div>
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
    </div>
  );
}
