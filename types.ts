
export enum UserRole {
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER',
  ADMIN = 'ADMIN'
}

export enum ServiceCategory {
  PLUMBER = 'Plumber',
  ELECTRICIAN = 'Electrician',
  MECHANIC = 'Mechanic',
  MOBILE_REPAIR = 'Mobile Repair',
  APPLIANCE_REPAIR = 'Appliance Repair'
}

export enum BookingStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  ON_THE_WAY = 'On the Way',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  location?: Location;
}

export interface ProviderProfile extends User {
  category: ServiceCategory;
  experience: number;
  rating: number;
  reviewCount: number;
  baseCharge: number;
  isOnline: boolean;
  serviceArea: string;
  isApproved: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  serviceType: ServiceCategory;
  status: BookingStatus;
  date: string;
  time: string;
  totalAmount: number;
  clientLocation: Location;
}

export interface Review {
  id: string;
  bookingId: string;
  providerId: string;
  clientId: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
}
