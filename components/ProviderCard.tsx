
import React from 'react';
import { Star, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { ProviderProfile } from '../types';

interface ProviderCardProps {
  provider: ProviderProfile;
  onBook: (id: string) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onBook }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="relative">
          <img 
            src={provider.avatar} 
            alt={provider.name} 
            className="w-20 h-20 rounded-xl object-cover"
          />
          {provider.isOnline && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{provider.name}</h3>
              <p className="text-indigo-600 text-sm font-medium">{provider.category}</p>
            </div>
            {provider.isApproved && (
              <ShieldCheck className="w-5 h-5 text-blue-500" />
            )}
          </div>
          
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-700">{provider.rating}</span>
            <span className="text-xs text-gray-400">({provider.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex items-center gap-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-xs">{provider.experience} yrs exp.</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="text-xs">{provider.serviceArea}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
        <div>
          <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Starts from</span>
          <span className="text-xl font-bold text-gray-900">${provider.baseCharge}</span>
        </div>
        <button 
          onClick={() => onBook(provider.id)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-100"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};
