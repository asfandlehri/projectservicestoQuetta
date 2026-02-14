
import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  Star, 
  Bell, 
  CheckCircle,
  Clock,
  Settings,
  Save
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { BookingStatusBadge } from '../components/BookingStatusBadge';
import { BookingStatus, ProviderProfile } from '../types';

const DATA = [
  { name: 'Mon', earnings: 120 },
  { name: 'Tue', earnings: 250 },
  { name: 'Wed', earnings: 180 },
  { name: 'Thu', earnings: 340 },
  { name: 'Fri', earnings: 290 },
  { name: 'Sat', earnings: 520 },
  { name: 'Sun', earnings: 410 },
];

interface ProviderDashboardProps {
  currentProvider?: ProviderProfile;
  onUpdatePrice: (newPrice: number) => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ currentProvider, onUpdatePrice }) => {
  const [newPrice, setNewPrice] = useState(currentProvider?.baseCharge || 0);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdatePrice = () => {
    setIsUpdating(true);
    setTimeout(() => {
      onUpdatePrice(newPrice);
      setIsUpdating(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentProvider?.name || 'Pro'}!</h1>
          <p className="text-gray-500">You are <span className="text-green-600 font-bold">online</span> and ready for jobs.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 sm:flex-none px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 flex items-center justify-center gap-2">
            <Bell size={20} />
            Notifications
          </button>
          <button className="flex-1 sm:flex-none px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100">
            Go Offline
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <DollarSign />, label: 'Weekly Earnings', value: '$2,110', trend: '+12.5%', color: 'text-green-600', bg: 'bg-green-100' },
              { icon: <Users />, label: 'Total Clients', value: '482', trend: '+5.2%', color: 'text-blue-600', bg: 'bg-blue-100' },
              { icon: <Star />, label: 'Avg Rating', value: '4.92', trend: 'Excellent', color: 'text-yellow-600', bg: 'bg-yellow-100' },
              { icon: <CheckCircle />, label: 'Jobs Done', value: '1,240', trend: '98% rate', color: 'text-purple-600', bg: 'bg-purple-100' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  <p className={`text-xs font-bold mt-1 ${stat.color}`}>{stat.trend}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-[300px]">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Earnings Overview</h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="earnings" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          {/* Price Settings */}
          <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
                <Settings size={20} />
              </div>
              <h3 className="font-bold text-gray-900">Service Settings</h3>
            </div>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base Service Charge ($)</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    className="flex-1 bg-gray-50 border-none h-12 px-4 rounded-xl text-lg font-bold focus:ring-2 focus:ring-indigo-500"
                  />
                  <button 
                    onClick={handleUpdatePrice}
                    disabled={isUpdating}
                    className="bg-indigo-600 text-white p-3 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
                  >
                    <Save size={24} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                * Setting a competitive price helps you get connected to more clients in your area.
              </p>
            </div>
          </section>

          {/* New Requests */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 px-2">Job Requests</h3>
            {[1].map((_, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border-2 border-indigo-100 shadow-lg shadow-indigo-50 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold">MK</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 leading-none">Maria Kelly</h4>
                    <span className="text-xs text-gray-400 font-medium">0.8 miles away • Tap Repair</span>
                  </div>
                  <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                    ${currentProvider?.baseCharge || 0}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-50 text-gray-600 font-bold py-2.5 rounded-xl text-sm">Decline</button>
                  <button className="flex-2 bg-indigo-600 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
                    <CheckCircle size={18} />
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};
