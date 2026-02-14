
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { ProviderCard } from '../components/ProviderCard';
import { ChevronLeft, Filter, Map, List } from 'lucide-react';
import { ProviderProfile } from '../types';

interface ProviderListProps {
  providers: ProviderProfile[];
}

export const ProviderList: React.FC<ProviderListProps> = ({ providers: allProviders }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'list' | 'map'>('list');

  const formattedCatId = categoryId?.replace('-', ' ');
  const category = CATEGORIES.find(c => c.label.toLowerCase() === formattedCatId);
  const providers = allProviders.filter(p => p.category.toLowerCase() === formattedCatId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{category?.label || 'Providers'}</h1>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setViewType(viewType === 'list' ? 'map' : 'list')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            {viewType === 'list' ? <Map size={18} /> : <List size={18} />}
            {viewType === 'list' ? 'Map View' : 'List View'}
          </button>
          <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {viewType === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {providers.length > 0 ? (
            providers.map(p => (
              <ProviderCard 
                key={p.id} 
                provider={p} 
                onBook={(id) => navigate(`/book/${id}`)} 
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <p className="text-gray-500">No providers found in this category near you.</p>
              <button className="text-indigo-600 font-bold" onClick={() => navigate('/')}>
                Try another category
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-[600px] bg-gray-200 rounded-3xl relative overflow-hidden shadow-inner flex items-center justify-center border-4 border-white animate-in zoom-in-95 duration-500">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover opacity-50 grayscale"></div>
          
          {providers.map((p, idx) => (
            <div 
              key={p.id}
              className="absolute group"
              style={{ 
                top: `${30 + idx * 15}%`, 
                left: `${40 + idx * 10}%` 
              }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center p-1 border-2 border-indigo-600 group-hover:scale-110 transition-transform cursor-pointer">
                  <img src={p.avatar} className="w-full h-full rounded-xl object-cover" />
                </div>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-lg border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold">${p.baseCharge}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="relative z-10 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl font-medium text-gray-800">
            Showing {providers.length} results on map
          </div>
        </div>
      )}
    </div>
  );
};
