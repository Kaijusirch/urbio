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
import { lostProperty } from '@/data/mockData';
import { useState } from 'react';
import { Search, Package, Phone, MapPin, Calendar, Clock } from 'lucide-react';

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

export default function LostPropertyPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = lostProperty.filter(
    (item) =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vehicleRego.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.foundLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lost Property Registry</h1>
          <p className="text-muted-foreground">{lostProperty.filter(lp => lp.status !== 'claimed' && lp.status !== 'disposed').length} items pending</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
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
              <Package className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{lostProperty.filter(lp => lp.status === 'unclaimed').length}</p>
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
                <p className="text-2xl font-bold">{lostProperty.filter(lp => lp.status === 'contacted').length}</p>
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
                <p className="text-2xl font-bold">{lostProperty.filter(lp => lp.status === 'claimed').length}</p>
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
                <p className="text-2xl font-bold">{lostProperty.filter(lp => lp.status === 'disposed').length}</p>
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
                  </div>

                  <div className="lg:text-right space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Claim Deadline</p>
                      <p className="font-medium">{item.claimDeadline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Attempts</p>
                      <p className="font-medium">{item.contactAttempts}</p>
                    </div>
                    {item.passengerPhone && (
                      <div className="flex items-center gap-1 justify-end text-sm">
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
    </div>
  );
}
