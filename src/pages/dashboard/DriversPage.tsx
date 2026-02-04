import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { drivers } from '@/data/mockData';
import { useState } from 'react';
import { Search, Phone, Car, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const statusColors = {
  available: 'bg-success text-success-foreground',
  on_trip: 'bg-primary text-primary-foreground',
  off_duty: 'bg-muted text-muted-foreground',
};

const statusLabels = {
  available: 'Available',
  on_trip: 'On Trip',
  off_duty: 'Off Duty',
};

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

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.includes(searchTerm) ||
      driver.authNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.vehicleRego?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.suburb.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Driver Management</h1>
          <p className="text-muted-foreground">{drivers.length} registered drivers</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{drivers.filter(d => d.accreditationStatus === 'current').length}</p>
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
                <p className="text-2xl font-bold">{drivers.filter(d => d.accreditationStatus === 'expiring').length}</p>
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
                <p className="text-2xl font-bold">{drivers.filter(d => d.accreditationStatus === 'expired').length}</p>
                <p className="text-sm text-muted-foreground">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Car className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{drivers.filter(d => d.status === 'on_trip').length}</p>
                <p className="text-sm text-muted-foreground">Currently On Trip</p>
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
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Accreditation</TableHead>
                  <TableHead>Medical Expiry</TableHead>
                  <TableHead>Status</TableHead>
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
                      {driver.vehicleRego ? (
                        <div className="text-sm">
                          <p className="font-mono font-medium">{driver.vehicleRego}</p>
                          <p className="text-muted-foreground">{driver.vehicleMake} {driver.vehicleModel}</p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
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
                      <Badge className={statusColors[driver.status]}>
                        {statusLabels[driver.status]}
                      </Badge>
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
