
import React from 'react';
import { User, Mail, Phone, MapPin, Bell, Shield, CreditCard, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';

export const Profile: React.FC<{ role: UserRole }> = ({ role }) => {
  const menuItems = [
    { icon: <User size={20} />, label: 'Personal Information', sub: 'Name, Email, Profile picture' },
    { icon: <MapPin size={20} />, label: 'Saved Addresses', sub: 'Home, Office, Other locations' },
    { icon: <CreditCard size={20} />, label: 'Payment Methods', sub: 'Saved cards and wallets' },
    { icon: <Bell size={20} />, label: 'Notifications', sub: 'Status updates and offers' },
    { icon: <Shield size={20} />, label: 'Security', sub: 'Password, Biometrics, OTP' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/user/200" 
            alt="Profile" 
            className="w-32 h-32 rounded-3xl object-cover shadow-xl border-4 border-white"
          />
          <button className="absolute bottom-[-10px] right-[-10px] bg-indigo-600 text-white p-2.5 rounded-2xl shadow-lg hover:bg-indigo-700">
            <User size={18} />
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Alex Thompson</h1>
          <p className="text-gray-500 text-sm font-medium">Joined Oct 2023</p>
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mt-2 uppercase tracking-wide">
            {role} Account
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-gray-900">12</span>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bookings</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold text-gray-900">4.9</span>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">User Rating</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-2">Account Settings</h3>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {menuItems.map((item, idx) => (
            <button 
              key={idx}
              className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors ${
                idx !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl">
                  {item.icon}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 leading-tight">{item.label}</h4>
                  <p className="text-xs text-gray-500 font-medium">{item.sub}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300" size={20} />
            </button>
          ))}
        </div>
      </div>

      <button className="w-full bg-red-50 text-red-600 font-bold py-4 rounded-2xl hover:bg-red-100 transition-colors">
        Deactivate Account
      </button>
    </div>
  );
};
