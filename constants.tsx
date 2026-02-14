
import React from 'react';
import { 
  Wrench, 
  Zap, 
  Car, 
  Smartphone, 
  Refrigerator,
} from 'lucide-react';
import { ServiceCategory, ProviderProfile, UserRole } from './types';

export const CATEGORIES = [
  { 
    id: ServiceCategory.PLUMBER, 
    label: 'Plumbers', 
    icon: <Wrench className="w-8 h-8" />, 
    color: 'bg-blue-100 text-blue-600',
    description: 'Leaking pipes, taps & toilets' 
  },
  { 
    id: ServiceCategory.ELECTRICIAN, 
    label: 'Electricians', 
    icon: <Zap className="w-8 h-8" />, 
    color: 'bg-yellow-100 text-yellow-600',
    description: 'Wiring, lights & fans' 
  },
  { 
    id: ServiceCategory.MECHANIC, 
    label: 'Mechanics', 
    icon: <Car className="w-8 h-8" />, 
    color: 'bg-red-100 text-red-600',
    description: 'Engine, tires & breaks' 
  },
  { 
    id: ServiceCategory.MOBILE_REPAIR, 
    label: 'Mobile Repair', 
    icon: <Smartphone className="w-8 h-8" />, 
    color: 'bg-green-100 text-green-600',
    description: 'Screens, batteries & software' 
  },
  { 
    id: ServiceCategory.APPLIANCE_REPAIR, 
    label: 'Appliance Repair', 
    icon: <Refrigerator className="w-8 h-8" />, 
    color: 'bg-purple-100 text-purple-600',
    description: 'Fridge, Washing machine' 
  },
];

export const INITIAL_PROVIDERS: ProviderProfile[] = [
  {
    id: 'p1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0101',
    role: UserRole.PROVIDER,
    category: ServiceCategory.PLUMBER,
    experience: 8,
    rating: 4.8,
    reviewCount: 124,
    baseCharge: 50,
    isOnline: true,
    serviceArea: 'Downtown',
    avatar: 'https://picsum.photos/seed/p1/200',
    isApproved: true,
    location: { lat: 40.7128, lng: -74.0060, address: '123 Main St' }
  },
  {
    id: 'p2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    phone: '555-0102',
    role: UserRole.PROVIDER,
    category: ServiceCategory.ELECTRICIAN,
    experience: 5,
    rating: 4.9,
    reviewCount: 89,
    baseCharge: 60,
    isOnline: true,
    serviceArea: 'Midtown',
    avatar: 'https://picsum.photos/seed/p2/200',
    isApproved: true,
    location: { lat: 40.7300, lng: -73.9900, address: '456 Broadway' }
  },
];
