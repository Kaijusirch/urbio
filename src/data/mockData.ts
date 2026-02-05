// Queensland Taxi CRM Mock Data
// All data is static and realistic for Queensland, Australia

export type UserRole = 'dispatch' | 'manager' | 'compliance';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string; // QLD driver license
  authNumber: string; // QLD Taxi Driver Authorisation
  phone: string;
  suburb: string;
  medicalExpiry: string;
  accreditationStatus: 'current' | 'expiring' | 'expired';
  accreditationExpiry: string;
  vehicleRego?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  status: 'available' | 'on_trip' | 'off_duty';
}

export interface Complaint {
  id: string;
  reference: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'new' | 'under_review' | 'resolved' | 'closed';
  createdAt: string;
  deadline: string;
  driverId: string;
  driverName: string;
  vehicleRego: string;
  bookingDetails: {
    pickup: string;
    dropoff: string;
    fare: number;
    date: string;
    time: string;
    source: 'app' | 'phone' | 'street_hail' | 'autocab';
  };
  outcome?: 'warning' | 'fine' | 'suspension' | 'dismissed';
}

export interface LostProperty {
  id: string;
  reference: string;
  item: string;
  description: string;
  vehicleRego: string;
  driverName: string;
  foundLocation: string;
  foundDate: string;
  status: 'unclaimed' | 'contacted' | 'claimed' | 'disposed';
  claimDeadline: string;
  contactAttempts: number;
  passengerPhone?: string;
  tripDetails?: {
    pickup: string;
    dropoff: string;
    fare: number;
    date: string;
    time: string;
  };
}

export interface FareEvasion {
  id: string;
  reference: string;
  amount: number;
  suburb: string;
  description: string;
  passengerDescription: string;
  date: string;
  time: string;
  driverId: string;
  driverName: string;
  vehicleRego: string;
  status: 'open' | 'investigating' | 'recovered' | 'written_off';
  policeReport?: string;
  tripDetails?: {
    pickup: string;
    dropoff: string;
  };
}

export interface Incident {
  id: string;
  reference: string;
  type: 'safety' | 'vehicle' | 'passenger' | 'environmental' | 'dispute';
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  date: string;
  time: string;
  driverId?: string;
  driverName?: string;
  vehicleRego?: string;
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  followUpRequired: boolean;
}

export interface Hearing {
  id: string;
  reference: string;
  driverId: string;
  driverName: string;
  scheduledDate: string;
  scheduledTime: string;
  allegation: string;
  regulationBreach: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'adjourned';
  outcome?: 'warning' | 'suspension' | 'revocation' | 'dismissed';
  documents: string[];
}

export interface ActivityFeedItem {
  id: string;
  type: 'complaint' | 'incident' | 'lost_property' | 'fare_evasion' | 'hearing';
  title: string;
  description: string;
  timestamp: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
}

// Demo Users
export const demoUsers: User[] = [
  { id: '1', name: 'Sarah Mitchell', email: 'dispatch@urbio.com.au', role: 'dispatch' },
  { id: '2', name: 'Michael Chen', email: 'manager@urbio.com.au', role: 'manager' },
  { id: '3', name: 'Rebecca Thompson', email: 'compliance@urbio.com.au', role: 'compliance' },
];

// Drivers (15+ profiles)
export const drivers: Driver[] = [
  {
    id: 'D001',
    name: 'James Wilson',
    licenseNumber: '12345678',
    authNumber: 'TDA-QLD-2019-4521',
    phone: '0412 345 678',
    suburb: 'Cairns North',
    medicalExpiry: '15/08/2026',
    accreditationStatus: 'current',
    accreditationExpiry: '22/03/2027',
    vehicleRego: 'T12-456',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry Hybrid',
    status: 'available',
  },
  {
    id: 'D002',
    name: 'Ahmed Hassan',
    licenseNumber: '23456789',
    authNumber: 'TDA-QLD-2020-7832',
    phone: '0423 456 789',
    suburb: 'Brisbane CBD',
    medicalExpiry: '03/12/2025',
    accreditationStatus: 'current',
    accreditationExpiry: '15/09/2026',
    vehicleRego: 'T34-789',
    vehicleMake: 'Hyundai',
    vehicleModel: 'Ioniq',
    status: 'on_trip',
  },
  {
    id: 'D003',
    name: 'Maria Santos',
    licenseNumber: '34567890',
    authNumber: 'TDA-QLD-2018-2156',
    phone: '0434 567 890',
    suburb: 'Surfers Paradise',
    medicalExpiry: '28/02/2026',
    accreditationStatus: 'expiring',
    accreditationExpiry: '10/03/2026',
    vehicleRego: 'T56-123',
    vehicleMake: 'Toyota',
    vehicleModel: 'Prius',
    status: 'available',
  },
  {
    id: 'D004',
    name: 'David Thompson',
    licenseNumber: '45678901',
    authNumber: 'TDA-QLD-2021-9043',
    phone: '0445 678 901',
    suburb: 'Townsville',
    medicalExpiry: '17/06/2026',
    accreditationStatus: 'current',
    accreditationExpiry: '05/11/2027',
    vehicleRego: 'T78-234',
    vehicleMake: 'Kia',
    vehicleModel: 'Niro',
    status: 'off_duty',
  },
  {
    id: 'D005',
    name: 'Priya Sharma',
    licenseNumber: '56789012',
    authNumber: 'TDA-QLD-2019-5678',
    phone: '0456 789 012',
    suburb: 'Broadbeach',
    medicalExpiry: '22/09/2025',
    accreditationStatus: 'current',
    accreditationExpiry: '18/07/2026',
    vehicleRego: 'T90-567',
    vehicleMake: 'Honda',
    vehicleModel: 'Accord',
    status: 'available',
  },
  {
    id: 'D006',
    name: 'Kevin Nguyen',
    licenseNumber: '67890123',
    authNumber: 'TDA-QLD-2020-3421',
    phone: '0467 890 123',
    suburb: 'Palm Cove',
    medicalExpiry: '11/04/2026',
    accreditationStatus: 'current',
    accreditationExpiry: '29/08/2027',
    vehicleRego: 'T23-890',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    status: 'on_trip',
  },
  {
    id: 'D007',
    name: 'Linda O\'Brien',
    licenseNumber: '78901234',
    authNumber: 'TDA-QLD-2017-8765',
    phone: '0478 901 234',
    suburb: 'Sunshine Coast',
    medicalExpiry: '05/01/2026',
    accreditationStatus: 'expired',
    accreditationExpiry: '20/01/2026',
    vehicleRego: 'T45-012',
    vehicleMake: 'Mazda',
    vehicleModel: '3',
    status: 'off_duty',
  },
  {
    id: 'D008',
    name: 'Robert Chang',
    licenseNumber: '89012345',
    authNumber: 'TDA-QLD-2022-1234',
    phone: '0489 012 345',
    suburb: 'Fortitude Valley',
    medicalExpiry: '30/07/2026',
    accreditationStatus: 'current',
    accreditationExpiry: '12/04/2028',
    vehicleRego: 'T67-345',
    vehicleMake: 'Toyota',
    vehicleModel: 'Corolla',
    status: 'available',
  },
  {
    id: 'D009',
    name: 'Emma Williams',
    licenseNumber: '90123456',
    authNumber: 'TDA-QLD-2019-6789',
    phone: '0490 123 456',
    suburb: 'Cairns',
    medicalExpiry: '14/11/2025',
    accreditationStatus: 'current',
    accreditationExpiry: '08/02/2027',
    vehicleRego: 'T89-678',
    vehicleMake: 'Hyundai',
    vehicleModel: 'i30',
    status: 'on_trip',
  },
  {
    id: 'D010',
    name: 'Mohammed Ali',
    licenseNumber: '01234567',
    authNumber: 'TDA-QLD-2021-4567',
    phone: '0401 234 567',
    suburb: 'Southport',
    medicalExpiry: '08/05/2026',
    accreditationStatus: 'current',
    accreditationExpiry: '25/10/2027',
    vehicleRego: 'T01-901',
    vehicleMake: 'Kia',
    vehicleModel: 'Cerato',
    status: 'available',
  },
  {
    id: 'D011',
    name: 'Sophie Brown',
    licenseNumber: '11223344',
    authNumber: 'TDA-QLD-2020-8901',
    phone: '0411 223 344',
    suburb: 'Robina',
    medicalExpiry: '19/03/2026',
    accreditationStatus: 'current',
    accreditationExpiry: '14/06/2027',
    vehicleRego: 'T23-456',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    status: 'off_duty',
  },
  {
    id: 'D012',
    name: 'Chris Murphy',
    licenseNumber: '22334455',
    authNumber: 'TDA-QLD-2018-2345',
    phone: '0422 334 455',
    suburb: 'Mount Gravatt',
    medicalExpiry: '26/08/2025',
    accreditationStatus: 'expiring',
    accreditationExpiry: '02/03/2026',
    vehicleRego: 'T45-789',
    vehicleMake: 'Honda',
    vehicleModel: 'Civic',
    status: 'available',
  },
  {
    id: 'D013',
    name: 'Angela Lee',
    licenseNumber: '33445566',
    authNumber: 'TDA-QLD-2019-5678',
    phone: '0433 445 566',
    suburb: 'Noosa Heads',
    medicalExpiry: '12/10/2026',
    accreditationStatus: 'current',
    accreditationExpiry: '30/12/2027',
    vehicleRego: 'T67-012',
    vehicleMake: 'Mazda',
    vehicleModel: '6',
    status: 'on_trip',
  },
  {
    id: 'D014',
    name: 'Peter Jackson',
    licenseNumber: '44556677',
    authNumber: 'TDA-QLD-2022-6789',
    phone: '0444 556 677',
    suburb: 'Magnetic Island',
    medicalExpiry: '07/02/2026',
    accreditationStatus: 'current',
    accreditationExpiry: '19/05/2028',
    vehicleRego: 'T89-345',
    vehicleMake: 'Toyota',
    vehicleModel: 'Prius',
    status: 'available',
  },
  {
    id: 'D015',
    name: 'Natalie Green',
    licenseNumber: '55667788',
    authNumber: 'TDA-QLD-2021-7890',
    phone: '0455 667 788',
    suburb: 'Mooloolaba',
    medicalExpiry: '23/06/2026',
    accreditationStatus: 'current',
    accreditationExpiry: '11/09/2027',
    vehicleRego: 'T01-678',
    vehicleMake: 'Hyundai',
    vehicleModel: 'Sonata',
    status: 'off_duty',
  },
  {
    id: 'D016',
    name: 'Daniel Kim',
    licenseNumber: '66778899',
    authNumber: 'TDA-QLD-2020-8901',
    phone: '0466 778 899',
    suburb: 'Cairns CBD',
    medicalExpiry: '18/12/2025',
    accreditationStatus: 'current',
    accreditationExpiry: '06/03/2027',
    vehicleRego: 'T23-901',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry Hybrid',
    status: 'on_trip',
  },
];

// Complaints (10+ active)
export const complaints: Complaint[] = [
  {
    id: 'C001',
    reference: 'CMP-2026-0142',
    title: 'Driver refused short CBD fare',
    description: 'Passenger reports driver refused to take them from Queen Street Mall to South Bank, claiming the fare was too short. Driver allegedly became verbally aggressive when challenged.',
    priority: 'high',
    status: 'under_review',
    createdAt: '01/02/2026 14:32',
    deadline: '08/02/2026',
    driverId: 'D002',
    driverName: 'Ahmed Hassan',
    vehicleRego: 'T34-789',
    bookingDetails: {
      pickup: 'Queen Street Mall, Brisbane',
      dropoff: 'South Bank Parklands',
      fare: 12.50,
      date: '01/02/2026',
      time: '13:45',
      source: 'street_hail',
    },
  },
  {
    id: 'C002',
    reference: 'CMP-2026-0141',
    title: 'No child restraint available - QLD law violation',
    description: 'Family with 3-year-old child was picked up without appropriate child restraint. Driver stated none were available. Clear breach of Queensland road safety regulations.',
    priority: 'critical',
    status: 'new',
    createdAt: '02/02/2026 09:15',
    deadline: '05/02/2026',
    driverId: 'D005',
    driverName: 'Priya Sharma',
    vehicleRego: 'T90-567',
    bookingDetails: {
      pickup: 'Pacific Fair Shopping Centre',
      dropoff: 'Burleigh Heads',
      fare: 28.00,
      date: '02/02/2026',
      time: '08:30',
      source: 'app',
    },
  },
  {
    id: 'C003',
    reference: 'CMP-2026-0140',
    title: 'Overcharged airport to Surfers Paradise',
    description: 'Passenger claims they were charged $95 for Gold Coast Airport to Surfers Paradise when meter showed $72. Driver allegedly added "airport surcharge" not displayed.',
    priority: 'high',
    status: 'under_review',
    createdAt: '31/01/2026 18:22',
    deadline: '07/02/2026',
    driverId: 'D003',
    driverName: 'Maria Santos',
    vehicleRego: 'T56-123',
    bookingDetails: {
      pickup: 'Gold Coast Airport',
      dropoff: 'Surfers Paradise',
      fare: 95.00,
      date: '31/01/2026',
      time: '16:45',
      source: 'autocab',
    },
  },
  {
    id: 'C004',
    reference: 'CMP-2026-0139',
    title: 'Driver used mobile phone while driving',
    description: 'Passenger observed driver texting while driving along Captain Cook Highway. Felt unsafe and has dashcam footage to support complaint.',
    priority: 'critical',
    status: 'new',
    createdAt: '02/02/2026 11:45',
    deadline: '05/02/2026',
    driverId: 'D006',
    driverName: 'Kevin Nguyen',
    vehicleRego: 'T23-890',
    bookingDetails: {
      pickup: 'Cairns Esplanade',
      dropoff: 'Palm Cove',
      fare: 45.00,
      date: '02/02/2026',
      time: '10:30',
      source: 'phone',
    },
  },
  {
    id: 'C005',
    reference: 'CMP-2026-0138',
    title: 'Refused guide dog - Disability Discrimination Act breach',
    description: 'Vision impaired passenger with certified guide dog was refused service. Driver cited "allergies" but this is a clear breach of Disability Discrimination Act 1992.',
    priority: 'critical',
    status: 'under_review',
    createdAt: '30/01/2026 15:50',
    deadline: '06/02/2026',
    driverId: 'D001',
    driverName: 'James Wilson',
    vehicleRego: 'T12-456',
    bookingDetails: {
      pickup: 'Cairns Base Hospital',
      dropoff: 'Smithfield',
      fare: 32.00,
      date: '30/01/2026',
      time: '14:15',
      source: 'phone',
    },
  },
  {
    id: 'C006',
    reference: 'CMP-2026-0137',
    title: 'Unsafe driving - excessive speed',
    description: 'Passenger reports driver was speeding excessively on Pacific Highway, estimating 120km/h in 80km/h zone. Felt genuinely unsafe during journey.',
    priority: 'high',
    status: 'under_review',
    createdAt: '29/01/2026 20:10',
    deadline: '05/02/2026',
    driverId: 'D010',
    driverName: 'Mohammed Ali',
    vehicleRego: 'T01-901',
    bookingDetails: {
      pickup: 'Helensvale Station',
      dropoff: 'Main Beach',
      fare: 38.00,
      date: '29/01/2026',
      time: '19:00',
      source: 'app',
    },
  },
  {
    id: 'C007',
    reference: 'CMP-2026-0136',
    title: 'Rude and unprofessional conduct',
    description: 'Driver made inappropriate comments about passenger\'s appearance and destination. Passenger felt uncomfortable and harassed during the journey.',
    priority: 'medium',
    status: 'resolved',
    createdAt: '28/01/2026 22:30',
    deadline: '04/02/2026',
    driverId: 'D012',
    driverName: 'Chris Murphy',
    vehicleRego: 'T45-789',
    bookingDetails: {
      pickup: 'Fortitude Valley',
      dropoff: 'New Farm',
      fare: 18.00,
      date: '28/01/2026',
      time: '21:45',
      source: 'street_hail',
    },
    outcome: 'warning',
  },
  {
    id: 'C008',
    reference: 'CMP-2026-0135',
    title: 'Took longer route without consent',
    description: 'Passenger noticed driver took Pacific Motorway instead of direct route via Old Cleveland Road, adding $15 to fare. No traffic was observed on alternative route.',
    priority: 'medium',
    status: 'under_review',
    createdAt: '27/01/2026 16:45',
    deadline: '03/02/2026',
    driverId: 'D008',
    driverName: 'Robert Chang',
    vehicleRego: 'T67-345',
    bookingDetails: {
      pickup: 'Brisbane CBD',
      dropoff: 'Carindale',
      fare: 42.00,
      date: '27/01/2026',
      time: '15:30',
      source: 'autocab',
    },
  },
  {
    id: 'C009',
    reference: 'CMP-2026-0134',
    title: 'Vehicle cleanliness - hygiene concerns',
    description: 'Passenger reports taxi had strong unpleasant odour, stained seats, and rubbish on floor. Requested to change vehicles but driver refused.',
    priority: 'low',
    status: 'resolved',
    createdAt: '26/01/2026 10:20',
    deadline: '02/02/2026',
    driverId: 'D014',
    driverName: 'Peter Jackson',
    vehicleRego: 'T89-345',
    bookingDetails: {
      pickup: 'Townsville Airport',
      dropoff: 'Townsville CBD',
      fare: 25.00,
      date: '26/01/2026',
      time: '09:30',
      source: 'autocab',
    },
    outcome: 'warning',
  },
  {
    id: 'C010',
    reference: 'CMP-2026-0133',
    title: 'Refused EFTPOS payment',
    description: 'Driver insisted on cash payment only, claiming EFTPOS machine was broken. Passenger had no cash and was stranded at destination.',
    priority: 'medium',
    status: 'new',
    createdAt: '25/01/2026 19:55',
    deadline: '01/02/2026',
    driverId: 'D009',
    driverName: 'Emma Williams',
    vehicleRego: 'T89-678',
    bookingDetails: {
      pickup: 'Cairns Central',
      dropoff: 'Trinity Beach',
      fare: 35.00,
      date: '25/01/2026',
      time: '18:30',
      source: 'phone',
    },
  },
  {
    id: 'C011',
    reference: 'CMP-2026-0132',
    title: 'Failed to provide receipt',
    description: 'Business traveller requested receipt for expense claim. Driver said printer was not working and refused to provide handwritten receipt.',
    priority: 'low',
    status: 'closed',
    createdAt: '24/01/2026 08:15',
    deadline: '31/01/2026',
    driverId: 'D015',
    driverName: 'Natalie Green',
    vehicleRego: 'T01-678',
    bookingDetails: {
      pickup: 'Brisbane Airport Domestic',
      dropoff: 'Brisbane Convention Centre',
      fare: 55.00,
      date: '24/01/2026',
      time: '07:00',
      source: 'autocab',
    },
    outcome: 'dismissed',
  },
];

// Lost Property (5+ items)
export const lostProperty: LostProperty[] = [
  {
    id: 'LP001',
    reference: 'LST-2026-0089',
    item: 'iPhone 15 Pro Max',
    description: 'Space Black, 256GB, with clear case. Lock screen shows beach photo. Found under front passenger seat.',
    vehicleRego: 'T34-789',
    driverName: 'Ahmed Hassan',
    foundLocation: 'Brisbane CBD taxi rank',
    foundDate: '02/02/2026',
    status: 'contacted',
    claimDeadline: '02/03/2026',
    contactAttempts: 2,
    passengerPhone: '0412 987 654',
    tripDetails: {
      pickup: 'Brisbane Airport Domestic',
      dropoff: 'Queen Street Mall, Brisbane',
      fare: 52.00,
      date: '02/02/2026',
      time: '09:45',
    },
  },
  {
    id: 'LP002',
    reference: 'LST-2026-0088',
    item: 'Leather Wallet',
    description: 'Brown leather bifold wallet containing various cards and approximately $120 cash. Owner ID shows Cairns address.',
    vehicleRego: 'T23-890',
    driverName: 'Kevin Nguyen',
    foundLocation: 'Palm Cove drop-off',
    foundDate: '01/02/2026',
    status: 'unclaimed',
    claimDeadline: '01/03/2026',
    contactAttempts: 0,
    tripDetails: {
      pickup: 'Cairns Esplanade',
      dropoff: 'Palm Cove',
      fare: 45.00,
      date: '01/02/2026',
      time: '14:20',
    },
  },
  {
    id: 'LP003',
    reference: 'LST-2026-0087',
    item: 'Surfboard',
    description: '6\'2" shortboard, white with blue stripes. "Reef" brand. Left in taxi boot after Gold Coast Airport pickup.',
    vehicleRego: 'T56-123',
    driverName: 'Maria Santos',
    foundLocation: 'Surfers Paradise',
    foundDate: '31/01/2026',
    status: 'claimed',
    claimDeadline: '28/02/2026',
    contactAttempts: 1,
    passengerPhone: '0423 456 123',
    tripDetails: {
      pickup: 'Gold Coast Airport',
      dropoff: 'Surfers Paradise',
      fare: 38.00,
      date: '31/01/2026',
      time: '11:30',
    },
  },
  {
    id: 'LP004',
    reference: 'LST-2026-0086',
    item: 'Prescription Glasses',
    description: 'Ray-Ban frames, progressive lenses. Black with gold accents. Found in back seat cup holder area.',
    vehicleRego: 'T67-345',
    driverName: 'Robert Chang',
    foundLocation: 'Carindale Shopping Centre',
    foundDate: '29/01/2026',
    status: 'contacted',
    claimDeadline: '26/02/2026',
    contactAttempts: 3,
    passengerPhone: '0434 567 890',
    tripDetails: {
      pickup: 'Brisbane CBD',
      dropoff: 'Carindale Shopping Centre',
      fare: 35.00,
      date: '29/01/2026',
      time: '16:15',
    },
  },
  {
    id: 'LP005',
    reference: 'LST-2026-0085',
    item: 'Laptop Bag with MacBook',
    description: 'Black Samsonite laptop bag containing MacBook Air M2 and various cables. Business documents inside.',
    vehicleRego: 'T01-901',
    driverName: 'Mohammed Ali',
    foundLocation: 'Southport taxi rank',
    foundDate: '28/01/2026',
    status: 'claimed',
    claimDeadline: '25/02/2026',
    contactAttempts: 1,
    passengerPhone: '0445 678 901',
    tripDetails: {
      pickup: 'Helensvale Station',
      dropoff: 'Southport CBD',
      fare: 28.00,
      date: '28/01/2026',
      time: '08:45',
    },
  },
  {
    id: 'LP006',
    reference: 'LST-2026-0084',
    item: 'Child\'s Backpack',
    description: 'Pink unicorn backpack containing school books, pencil case, and lunch container. Name tag says "Emily".',
    vehicleRego: 'T90-567',
    driverName: 'Priya Sharma',
    foundLocation: 'Robina Town Centre',
    foundDate: '27/01/2026',
    status: 'unclaimed',
    claimDeadline: '24/02/2026',
    contactAttempts: 0,
    tripDetails: {
      pickup: 'Burleigh Heads',
      dropoff: 'Robina Town Centre',
      fare: 22.00,
      date: '27/01/2026',
      time: '15:30',
    },
  },
];

// Fare Evasions (3+ cases)
export const fareEvasions: FareEvasion[] = [
  {
    id: 'FE001',
    reference: 'EVD-2026-0034',
    amount: 67.50,
    suburb: 'Fortitude Valley',
    description: 'Passenger exited vehicle at traffic lights on Brunswick Street and fled on foot towards the Valley Mall. Fare from Brisbane Airport.',
    passengerDescription: 'Male, approximately 25-30 years, wearing dark hoodie and jeans, carrying backpack.',
    date: '01/02/2026',
    time: '23:45',
    driverId: 'D008',
    driverName: 'Robert Chang',
    vehicleRego: 'T67-345',
    status: 'investigating',
    policeReport: 'QP2026-0892341',
    tripDetails: {
      pickup: 'Brisbane Airport Domestic',
      dropoff: 'Brunswick Street, Fortitude Valley',
    },
  },
  {
    id: 'FE002',
    reference: 'EVD-2026-0033',
    amount: 42.00,
    suburb: 'Surfers Paradise',
    description: 'Group of 3 passengers exited at Cavill Avenue nightclub district. Claimed to be getting cash from ATM but never returned.',
    passengerDescription: 'Three males, early 20s, dressed for night out. One wearing distinctive red shirt.',
    date: '31/01/2026',
    time: '02:15',
    driverId: 'D003',
    driverName: 'Maria Santos',
    vehicleRego: 'T56-123',
    status: 'open',
    tripDetails: {
      pickup: 'Broadbeach Casino',
      dropoff: 'Cavill Avenue, Surfers Paradise',
    },
  },
  {
    id: 'FE003',
    reference: 'EVD-2026-0032',
    amount: 28.50,
    suburb: 'Cairns',
    description: 'Passenger ran from taxi at Lake Street destination. Driver pursued briefly but lost sight near Cairns Central.',
    passengerDescription: 'Female, approximately 35 years, blonde hair, wearing floral dress and carrying small handbag.',
    date: '28/01/2026',
    time: '20:30',
    driverId: 'D016',
    driverName: 'Daniel Kim',
    vehicleRego: 'T23-901',
    status: 'written_off',
    tripDetails: {
      pickup: 'Cairns Esplanade',
      dropoff: 'Lake Street, Cairns CBD',
    },
  },
  {
    id: 'FE004',
    reference: 'EVD-2026-0031',
    amount: 85.00,
    suburb: 'Townsville',
    description: 'Passenger provided false address. Upon arrival, claimed they lived elsewhere and had no money. Became aggressive when questioned.',
    passengerDescription: 'Male, approximately 40 years, heavyset build, bald, wearing work boots and high-vis vest.',
    date: '26/01/2026',
    time: '17:20',
    driverId: 'D004',
    driverName: 'David Thompson',
    vehicleRego: 'T78-234',
    status: 'investigating',
    policeReport: 'QP2026-0891567',
    tripDetails: {
      pickup: 'Townsville CBD',
      dropoff: 'Cranbrook (false address)',
    },
  },
];

// Incidents (5+ reports)
export const incidents: Incident[] = [
  {
    id: 'INC001',
    reference: 'INC-2026-0156',
    type: 'environmental',
    title: 'Cyclone Kirrily service disruption',
    description: 'Category 2 cyclone approaching Townsville region. All taxi services suspended north of Mackay until further notice. Emergency protocols activated.',
    severity: 'critical',
    location: 'North Queensland region',
    date: '02/02/2026',
    time: '06:00',
    status: 'investigating',
    followUpRequired: true,
  },
  {
    id: 'INC002',
    reference: 'INC-2026-0155',
    type: 'environmental',
    title: 'Cassowary on road - vehicle damage',
    description: 'Driver encountered cassowary crossing Mission Beach Road. Minor collision caused damage to front bumper. Cassowary appeared uninjured and left scene.',
    severity: 'medium',
    location: 'Mission Beach Road, Wongaling Beach',
    date: '01/02/2026',
    time: '07:45',
    driverId: 'D009',
    driverName: 'Emma Williams',
    vehicleRego: 'T89-678',
    status: 'resolved',
    followUpRequired: false,
  },
  {
    id: 'INC003',
    reference: 'INC-2026-0154',
    type: 'dispute',
    title: 'Airport rank queue dispute',
    description: 'Altercation between two drivers regarding queue position at Brisbane Domestic terminal. Security intervened. Both drivers issued warnings.',
    severity: 'medium',
    location: 'Brisbane Airport Domestic Terminal',
    date: '31/01/2026',
    time: '14:20',
    driverId: 'D002',
    driverName: 'Ahmed Hassan',
    vehicleRego: 'T34-789',
    status: 'closed',
    followUpRequired: false,
  },
  {
    id: 'INC004',
    reference: 'INC-2026-0153',
    type: 'passenger',
    title: 'Passenger assault on driver',
    description: 'Intoxicated passenger became violent after being asked to pay fare. Driver sustained minor injuries. Police attended and arrested passenger.',
    severity: 'critical',
    location: 'Cavill Avenue, Surfers Paradise',
    date: '30/01/2026',
    time: '01:30',
    driverId: 'D010',
    driverName: 'Mohammed Ali',
    vehicleRego: 'T01-901',
    status: 'investigating',
    followUpRequired: true,
  },
  {
    id: 'INC005',
    reference: 'INC-2026-0152',
    type: 'vehicle',
    title: 'Vehicle breakdown - engine failure',
    description: 'Vehicle experienced complete engine failure on Gateway Motorway. Passenger transferred to another taxi. Vehicle towed for repairs.',
    severity: 'low',
    location: 'Gateway Motorway, Murarrie',
    date: '29/01/2026',
    time: '11:15',
    driverId: 'D012',
    driverName: 'Chris Murphy',
    vehicleRego: 'T45-789',
    status: 'resolved',
    followUpRequired: false,
  },
  {
    id: 'INC006',
    reference: 'INC-2026-0151',
    type: 'environmental',
    title: 'Kangaroo strike - vehicle damaged',
    description: 'Kangaroo jumped in front of vehicle on Bruce Highway near Noosa. Significant front-end damage. Vehicle currently off-road for repairs.',
    severity: 'medium',
    location: 'Bruce Highway, Cooroy',
    date: '27/01/2026',
    time: '05:30',
    driverId: 'D013',
    driverName: 'Angela Lee',
    vehicleRego: 'T67-012',
    status: 'resolved',
    followUpRequired: true,
  },
];

// Hearings (3+ scheduled)
export const hearings: Hearing[] = [
  {
    id: 'H001',
    reference: 'HRG-2026-0023',
    driverId: 'D001',
    driverName: 'James Wilson',
    scheduledDate: '10/02/2026',
    scheduledTime: '10:00',
    allegation: 'Refusal to carry assistance animal',
    regulationBreach: 'Transport Operations (Passenger Transport) Regulation 2018 - Section 47',
    status: 'scheduled',
    documents: ['Complaint form', 'Witness statement', 'Guide Dogs QLD certification'],
  },
  {
    id: 'H002',
    reference: 'HRG-2026-0022',
    driverId: 'D006',
    driverName: 'Kevin Nguyen',
    scheduledDate: '12/02/2026',
    scheduledTime: '14:00',
    allegation: 'Use of mobile phone while driving',
    regulationBreach: 'Transport Operations (Road Use Management) Act 1995 - Section 300',
    status: 'scheduled',
    documents: ['Complaint form', 'Dashcam footage', 'Driver statement'],
  },
  {
    id: 'H003',
    reference: 'HRG-2026-0021',
    driverId: 'D007',
    driverName: 'Linda O\'Brien',
    scheduledDate: '05/02/2026',
    scheduledTime: '09:30',
    allegation: 'Operating with expired driver authorisation',
    regulationBreach: 'Transport Operations (Passenger Transport) Regulation 2018 - Section 21',
    status: 'in_progress',
    documents: ['Authorisation records', 'Renewal notices', 'Driver response'],
  },
  {
    id: 'H004',
    reference: 'HRG-2026-0020',
    driverId: 'D012',
    driverName: 'Chris Murphy',
    scheduledDate: '03/02/2026',
    scheduledTime: '11:00',
    allegation: 'Multiple complaints of inappropriate conduct',
    regulationBreach: 'Transport Operations (Passenger Transport) Regulation 2018 - Section 44',
    status: 'completed',
    outcome: 'suspension',
    documents: ['Complaint records', 'Previous warnings', 'Character references'],
  },
];

// Activity Feed (recent events)
export const activityFeed: ActivityFeedItem[] = [
  {
    id: 'AF001',
    type: 'complaint',
    title: 'New critical complaint received',
    description: 'No child restraint available - QLD law violation',
    timestamp: '02/02/2026 09:15',
    priority: 'critical',
  },
  {
    id: 'AF002',
    type: 'complaint',
    title: 'New critical complaint received',
    description: 'Driver used mobile phone while driving - Cairns',
    timestamp: '02/02/2026 11:45',
    priority: 'critical',
  },
  {
    id: 'AF003',
    type: 'incident',
    title: 'Cyclone warning issued',
    description: 'Category 2 cyclone approaching - services suspended north of Mackay',
    timestamp: '02/02/2026 06:00',
    priority: 'critical',
  },
  {
    id: 'AF004',
    type: 'lost_property',
    title: 'New item reported',
    description: 'iPhone 15 Pro Max found in T34-789',
    timestamp: '02/02/2026 08:30',
  },
  {
    id: 'AF005',
    type: 'fare_evasion',
    title: 'Fare evasion reported',
    description: '$67.50 - Passenger fled in Fortitude Valley',
    timestamp: '01/02/2026 23:55',
    priority: 'high',
  },
  {
    id: 'AF006',
    type: 'hearing',
    title: 'Hearing completed',
    description: 'Chris Murphy - Suspension issued',
    timestamp: '03/02/2026 13:30',
    priority: 'medium',
  },
  {
    id: 'AF007',
    type: 'complaint',
    title: 'Complaint resolved',
    description: 'Rude and unprofessional conduct - Warning issued',
    timestamp: '01/02/2026 16:45',
  },
  {
    id: 'AF008',
    type: 'incident',
    title: 'Wildlife incident reported',
    description: 'Cassowary collision on Mission Beach Road',
    timestamp: '01/02/2026 07:50',
    priority: 'medium',
  },
];

// Dashboard metrics
export const dashboardMetrics = {
  activeComplaints: complaints.filter(c => c.status !== 'closed').length,
  criticalComplaints: complaints.filter(c => c.priority === 'critical' && c.status !== 'closed').length,
  availableVehicles: drivers.filter(d => d.status === 'available').length,
  totalVehicles: drivers.length,
  openFareEvasions: fareEvasions.filter(f => f.status === 'open' || f.status === 'investigating').length,
  totalFareEvasionAmount: fareEvasions.filter(f => f.status !== 'recovered').reduce((sum, f) => sum + f.amount, 0),
  pendingHearings: hearings.filter(h => h.status === 'scheduled' || h.status === 'in_progress').length,
  driversOnTrip: drivers.filter(d => d.status === 'on_trip').length,
  driversOnline: drivers.filter(d => d.status !== 'off_duty').length,
};
