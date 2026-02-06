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
import { complaints, Complaint, drivers } from '@/data/mockData';
import { useState } from 'react';
import { Search, Clock, AlertCircle, CheckCircle2, FileText, MapPin, Car, DollarSign, Calendar, Plus, Pencil, Trash2 } from 'lucide-react';

const priorityColors = {
  critical: 'bg-destructive text-destructive-foreground',
  high: 'bg-warning text-warning-foreground',
  medium: 'bg-primary text-primary-foreground',
  low: 'bg-muted text-muted-foreground',
};

const statusColors = {
  new: 'bg-destructive/10 text-destructive border-destructive/30',
  under_review: 'bg-warning/10 text-warning border-warning/30',
  resolved: 'bg-success/10 text-success border-success/30',
  closed: 'bg-muted text-muted-foreground border-muted',
};

const statusLabels = {
  new: 'New',
  under_review: 'Under Review',
  resolved: 'Resolved',
  closed: 'Closed',
};

const sourceLabels = {
  app: 'App',
  phone: 'Phone',
  street_hail: 'Street Hail',
  autocab: 'Autocab',
};

type ComplaintForm = {
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'new' | 'under_review' | 'resolved' | 'closed';
  driverId: string;
  vehicleRego: string;
  pickup: string;
  dropoff: string;
  fare: string;
  tripDate: string;
  tripTime: string;
  source: 'app' | 'phone' | 'street_hail' | 'autocab';
};

const emptyComplaintForm: ComplaintForm = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'new',
  driverId: '',
  vehicleRego: '',
  pickup: '',
  dropoff: '',
  fare: '',
  tripDate: '',
  tripTime: '',
  source: 'phone',
};

export default function ComplaintsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [localComplaints, setLocalComplaints] = useState<Complaint[]>(complaints);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [formData, setFormData] = useState<ComplaintForm>(emptyComplaintForm);

  const filteredComplaints = localComplaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.vehicleRego.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAddComplaint = () => {
    const selectedDriver = drivers.find(d => d.id === formData.driverId);
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
    const complaint: Complaint = {
      id: `C${String(localComplaints.length + 1).padStart(3, '0')}`,
      reference: `CMP-2026-${String(143 + localComplaints.length).padStart(4, '0')}`,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: 'new',
      createdAt: `${formattedDate} ${new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}`,
      deadline: formattedDate,
      driverId: formData.driverId,
      driverName: selectedDriver?.name || 'Unknown',
      vehicleRego: formData.vehicleRego,
      bookingDetails: {
        pickup: formData.pickup,
        dropoff: formData.dropoff,
        fare: parseFloat(formData.fare) || 0,
        date: formData.tripDate,
        time: formData.tripTime,
        source: formData.source,
      },
    };
    setLocalComplaints([complaint, ...localComplaints]);
    setDialogOpen(false);
    setFormData(emptyComplaintForm);
  };

  const handleEditClick = (complaint: Complaint, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComplaint(complaint);
    setFormData({
      title: complaint.title,
      description: complaint.description,
      priority: complaint.priority,
      status: complaint.status,
      driverId: complaint.driverId,
      vehicleRego: complaint.vehicleRego,
      pickup: complaint.bookingDetails.pickup,
      dropoff: complaint.bookingDetails.dropoff,
      fare: complaint.bookingDetails.fare.toString(),
      tripDate: complaint.bookingDetails.date,
      tripTime: complaint.bookingDetails.time,
      source: complaint.bookingDetails.source,
    });
    setEditDialogOpen(true);
  };

  const handleUpdateComplaint = () => {
    if (!selectedComplaint) return;
    const selectedDriver = drivers.find(d => d.id === formData.driverId);
    setLocalComplaints(localComplaints.map(c => 
      c.id === selectedComplaint.id 
        ? {
            ...c,
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            status: formData.status,
            driverId: formData.driverId,
            driverName: selectedDriver?.name || c.driverName,
            vehicleRego: formData.vehicleRego,
            bookingDetails: {
              pickup: formData.pickup,
              dropoff: formData.dropoff,
              fare: parseFloat(formData.fare) || 0,
              date: formData.tripDate,
              time: formData.tripTime,
              source: formData.source,
            },
          }
        : c
    ));
    setEditDialogOpen(false);
    setSelectedComplaint(null);
    setFormData(emptyComplaintForm);
  };

  const handleDeleteClick = (complaint: Complaint, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComplaint(complaint);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedComplaint) return;
    setLocalComplaints(localComplaints.filter(c => c.id !== selectedComplaint.id));
    setDeleteDialogOpen(false);
    setSelectedComplaint(null);
  };

  const ComplaintFormFields = ({ showStatus = false }: { showStatus?: boolean }) => (
    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 col-span-2">
          <Label>Complaint Title</Label>
          <Input 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Brief description of complaint"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Full details of the complaint..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Priority</Label>
          <Select value={formData.priority} onValueChange={(v) => setFormData({...formData, priority: v as typeof formData.priority})}>
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
        {showStatus && (
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v as typeof formData.status})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
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
      </div>
      <div className="space-y-2">
        <Label>Vehicle Rego</Label>
        <Input 
          value={formData.vehicleRego}
          onChange={(e) => setFormData({...formData, vehicleRego: e.target.value})}
          placeholder="T12-345"
        />
      </div>
      
      {/* Trip Details Section */}
      <div className="pt-4 border-t">
        <h4 className="font-medium mb-3">Booking Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Pickup Location</Label>
            <Input 
              value={formData.pickup}
              onChange={(e) => setFormData({...formData, pickup: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Dropoff Location</Label>
            <Input 
              value={formData.dropoff}
              onChange={(e) => setFormData({...formData, dropoff: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Fare ($)</Label>
            <Input 
              value={formData.fare}
              onChange={(e) => setFormData({...formData, fare: e.target.value})}
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
          <div className="space-y-2">
            <Label>Source</Label>
            <Select value={formData.source} onValueChange={(v) => setFormData({...formData, source: v as typeof formData.source})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="app">App</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="street_hail">Street Hail</SelectItem>
                <SelectItem value="autocab">Autocab</SelectItem>
              </SelectContent>
            </Select>
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
          <h1 className="text-2xl font-bold text-foreground">Complaints Management</h1>
          <p className="text-muted-foreground">{localComplaints.filter(c => c.status !== 'closed').length} active complaints</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setFormData(emptyComplaintForm);
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Log New Complaint</DialogTitle>
              <DialogDescription>Enter details of the customer complaint.</DialogDescription>
            </DialogHeader>
            <ComplaintFormFields />
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddComplaint}>Log Complaint</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{localComplaints.filter(c => c.priority === 'critical' && c.status !== 'closed').length}</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{localComplaints.filter(c => c.status === 'new').length}</p>
                <p className="text-sm text-muted-foreground">New</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{localComplaints.filter(c => c.status === 'under_review').length}</p>
                <p className="text-sm text-muted-foreground">Under Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{localComplaints.filter(c => c.status === 'resolved' || c.status === 'closed').length}</p>
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
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id} className="overflow-hidden">
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setExpandedId(expandedId === complaint.id ? null : complaint.id)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-mono text-muted-foreground">{complaint.reference}</span>
                    <Badge className={priorityColors[complaint.priority]}>
                      {complaint.priority}
                    </Badge>
                    <Badge variant="outline" className={statusColors[complaint.status]}>
                      {statusLabels[complaint.status]}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{complaint.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-right mr-2">
                    <p className="text-muted-foreground">Deadline</p>
                    <p className="font-medium">{complaint.deadline}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={(e) => handleEditClick(complaint, e)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={(e) => handleDeleteClick(complaint, e)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {expandedId === complaint.id && (
              <CardContent className="border-t bg-muted/30">
                <div className="grid gap-6 lg:grid-cols-2 pt-4">
                  {/* Complaint Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{complaint.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Driver</p>
                        <p className="font-medium">{complaint.driverName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vehicle</p>
                        <p className="font-mono font-medium">{complaint.vehicleRego}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Created</p>
                        <p className="font-medium">{complaint.createdAt}</p>
                      </div>
                      {complaint.outcome && (
                        <div>
                          <p className="text-sm text-muted-foreground">Outcome</p>
                          <Badge variant="outline" className="capitalize">{complaint.outcome}</Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-4 p-4 rounded-lg bg-card border">
                    <h4 className="font-medium flex items-center gap-2">
                      <Car className="h-4 w-4 text-primary" />
                      Linked Booking Data
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Pickup</p>
                          <p className="font-medium">{complaint.bookingDetails.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-muted-foreground">Dropoff</p>
                          <p className="font-medium">{complaint.bookingDetails.dropoff}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Fare</p>
                            <p className="font-medium">${complaint.bookingDetails.fare.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Date</p>
                            <p className="font-medium">{complaint.bookingDetails.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Time</p>
                            <p className="font-medium">{complaint.bookingDetails.time}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Booking Source</p>
                        <Badge variant="secondary">{sourceLabels[complaint.bookingDetails.source]}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {filteredComplaints.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No complaints found matching your filters.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={(open) => {
        setEditDialogOpen(open);
        if (!open) {
          setSelectedComplaint(null);
          setFormData(emptyComplaintForm);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Complaint</DialogTitle>
            <DialogDescription>Update the complaint details below.</DialogDescription>
          </DialogHeader>
          <ComplaintFormFields showStatus />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateComplaint}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Complaint</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete complaint {selectedComplaint?.reference}? This action cannot be undone.
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
