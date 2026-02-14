
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { Search, MapPin } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          What service do <br />
          <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4">you need today?</span>
        </h1>
        <p className="text-gray-500">Fast, reliable help is just a few taps away.</p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
          <Search size={20} />
        </div>
        <input 
          type="text" 
          placeholder="Search for services or professionals..."
          className="w-full bg-white border-none shadow-sm h-14 pl-12 pr-4 rounded-2xl text-gray-900 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="bg-indigo-600 rounded-3xl p-6 text-white overflow-hidden relative shadow-xl">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-500/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
            <MapPin size={16} />
            Detecting your location...
          </div>
          <h2 className="text-2xl font-bold">Emergency help needed?</h2>
          <p className="text-indigo-100 text-sm max-w-[200px]">Our nearest professionals are just 15 mins away.</p>
          <button className="bg-white text-indigo-600 font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors">
            Get Quick Help
          </button>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
          <Search size={200} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Categories</h3>
          <button className="text-indigo-600 font-semibold text-sm">View all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/services/${cat.id.toLowerCase().replace(' ', '-')}`)}
              className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-50 group"
            >
              <div className={`p-4 rounded-2xl ${cat.color} group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="font-semibold text-sm text-gray-700 text-center">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-3 rounded-2xl text-green-600">
            <MapPin />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Nearby Service Hubs</h3>
            <p className="text-sm text-gray-500 mt-1">There are 12 active service providers near your current location in Downtown.</p>
            <button className="mt-4 text-indigo-600 font-bold text-sm underline underline-offset-4">
              Explore on Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
