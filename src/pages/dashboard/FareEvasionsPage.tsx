import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { fareEvasions } from '@/data/mockData';
import { useState } from 'react';
import { Search, DollarSign, MapPin, Calendar, Clock, User, Car, FileText } from 'lucide-react';

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

export default function FareEvasionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = fareEvasions.filter(
    (item) =>
      item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.suburb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vehicleRego.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalOutstanding = fareEvasions
    .filter(fe => fe.status === 'open' || fe.status === 'investigating')
    .reduce((sum, fe) => sum + fe.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fare Evasions</h1>
          <p className="text-muted-foreground">${totalOutstanding.toFixed(2)} outstanding</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases..."
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
              <DollarSign className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{fareEvasions.filter(fe => fe.status === 'open').length}</p>
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
                <p className="text-2xl font-bold">{fareEvasions.filter(fe => fe.status === 'investigating').length}</p>
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
                <p className="text-2xl font-bold">{fareEvasions.filter(fe => fe.status === 'recovered').length}</p>
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
    </div>
  );
}
