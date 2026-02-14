
import React from 'react';
/* Added Calendar to the list of imports from lucide-react */
import { Clock, MapPin, Phone, MessageSquare, ChevronRight, Calendar } from 'lucide-react';
import { BookingStatus, ServiceCategory } from '../types';
import { BookingStatusBadge } from '../components/BookingStatusBadge';

const MOCK_BOOKINGS = [
  {
    id: 'b1',
    providerName: 'John Doe',
    service: ServiceCategory.PLUMBER,
    status: BookingStatus.ACCEPTED,
    date: 'Today',
    time: '2:30 PM',
    amount: 50,
    avatar: 'https://picsum.photos/seed/p1/200'
  },
  {
    id: 'b2',
    providerName: 'Sarah Smith',
    service: ServiceCategory.ELECTRICIAN,
    status: BookingStatus.COMPLETED,
    date: 'Oct 12, 2023',
    time: '10:00 AM',
    amount: 60,
    avatar: 'https://picsum.photos/seed/p2/200'
  }
];

export const Bookings: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Bookings</h1>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button className="px-4 py-1.5 text-xs font-bold bg-white rounded-lg shadow-sm text-indigo-600">Active</button>
          <button className="px-4 py-1.5 text-xs font-bold text-gray-500">History</button>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_BOOKINGS.map((booking) => (
          <div key={booking.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            {booking.status === BookingStatus.ACCEPTED && (
              <div className="absolute top-0 right-0 p-1 bg-indigo-500 text-[10px] text-white font-bold px-3 rounded-bl-xl uppercase">
                Tracking Enabled
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <img src={booking.avatar} alt={booking.providerName} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900">{booking.providerName}</h3>
                  <BookingStatusBadge status={booking.status} />
                </div>
                <p className="text-indigo-600 text-sm font-medium">{booking.service}</p>
                <div className="flex items-center gap-3 mt-2 text-gray-500 text-xs font-medium">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {booking.date}, {booking.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    Home
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {booking.status === BookingStatus.ACCEPTED ? (
                <>
                  <button className="flex-1 bg-indigo-50 text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
                    <Phone size={18} />
                    Call
                  </button>
                  <button className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                    Track Arrival
                  </button>
                </>
              ) : (
                <>
                  <button className="flex-1 bg-gray-50 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                    Rebook Service
                  </button>
                  <button className="flex-1 bg-indigo-50 text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-100 transition-colors">
                    Add Review
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {MOCK_BOOKINGS.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Calendar size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No bookings yet</h3>
          <p className="text-gray-500 max-w-xs mx-auto">Start by exploring our top-rated service providers in your area.</p>
          <button className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl">
            Explore Services
          </button>
        </div>
      )}
    </div>
  );
};
