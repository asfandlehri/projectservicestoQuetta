
import React, { useState } from 'react';
import { UserPlus, MapPin, Briefcase, Phone, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { ServiceCategory, ProviderProfile, UserRole } from '../types';

interface AdminDashboardProps {
  onAddProvider: (provider: ProviderProfile) => void;
  providers: ProviderProfile[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onAddProvider, providers }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    category: ServiceCategory.PLUMBER,
    experience: 0,
    baseCharge: 0,
    avatar: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProvider: ProviderProfile = {
      id: `p${Date.now()}`,
      name: formData.name,
      email: `${formData.name.toLowerCase().replace(' ', '.')}@example.com`,
      phone: formData.phone,
      role: UserRole.PROVIDER,
      category: formData.category,
      experience: Number(formData.experience),
      rating: 5.0,
      reviewCount: 0,
      baseCharge: Number(formData.baseCharge),
      isOnline: true,
      serviceArea: formData.address,
      isApproved: true,
      avatar: formData.avatar || `https://picsum.photos/seed/${formData.name}/200`,
      location: { lat: 40.7128, lng: -74.0060, address: formData.address }
    };
    onAddProvider(newProvider);
    setFormData({
      name: '',
      phone: '',
      address: '',
      category: ServiceCategory.PLUMBER,
      experience: 0,
      baseCharge: 0,
      avatar: ''
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <div className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
          Management
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                <UserPlus size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Register New Provider</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                  <div className="relative">
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border-none h-12 px-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. Michael Smith"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Contact Number</label>
                  <div className="relative">
                    <input 
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-gray-50 border-none h-12 px-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Service Skill</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as ServiceCategory})}
                    className="w-full bg-gray-50 border-none h-12 px-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500"
                  >
                    {Object.values(ServiceCategory).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Experience (Years)</label>
                  <input 
                    required
                    type="number"
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: Number(e.target.value)})}
                    className="w-full bg-gray-50 border-none h-12 px-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Base Price ($)</label>
                  <input 
                    required
                    type="number"
                    value={formData.baseCharge}
                    onChange={e => setFormData({...formData, baseCharge: Number(e.target.value)})}
                    className="w-full bg-gray-50 border-none h-12 px-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Service Address</label>
                  <input 
                    required
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-gray-50 border-none h-12 px-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Downtown, NY"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Picture URL (Optional)</label>
                <input 
                  type="text"
                  value={formData.avatar}
                  onChange={e => setFormData({...formData, avatar: e.target.value})}
                  className="w-full bg-gray-50 border-none h-12 px-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold h-14 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus size={20} />
                Add Professional Provider
              </button>

              {showSuccess && (
                <div className="bg-green-50 text-green-700 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
                  <CheckCircle size={20} />
                  <span className="font-bold">Provider added successfully!</span>
                </div>
              )}
            </form>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Total Fleet</h3>
            <div className="space-y-4">
              {providers.map(p => (
                <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <img src={p.avatar} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-indigo-600">${p.baseCharge}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
